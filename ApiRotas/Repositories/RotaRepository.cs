using ApiRotas.Models;
using System.Text.Json;

namespace ApiRotas.Repositories
{
    public class RotaRepository : IRotaRepository
    {
        private const string CacheKey = "rotas";
        private readonly IHttpContextAccessor _httpContextAccessor;

        public RotaRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        private List<Rota> GetRotasFromCache()
        {
            var rotasJson = _httpContextAccessor.HttpContext.Request.Cookies[CacheKey];
            return string.IsNullOrEmpty(rotasJson)
                ? new List<Rota>()
                : JsonSerializer.Deserialize<List<Rota>>(rotasJson);
        }

        private void SaveRotasToCache(List<Rota> rotas)
        {
            var rotasJson = JsonSerializer.Serialize(rotas);
            _httpContextAccessor.HttpContext.Response.Cookies.Append(CacheKey, rotasJson);
        }

        public async Task<IEnumerable<Rota>> GetAllAsync()
        {
            return await Task.FromResult(GetRotasFromCache());
        }

        public async Task<Rota> GetByIdAsync(Guid id)
        {
            var rotas = GetRotasFromCache();
            return await Task.FromResult(rotas.FirstOrDefault(r => r.Id == id));
        }

        public async Task<Rota> CreateAsync(Rota rota)
        {
            var rotas = GetRotasFromCache();
            rota.Id = Guid.NewGuid();
            rotas.Add(rota);
            SaveRotasToCache(rotas);
            return await Task.FromResult(rota);
        }

        public async Task<Rota> UpdateAsync(Rota rota)
        {
            var rotas = GetRotasFromCache();
            var index = rotas.FindIndex(r => r.Id == rota.Id);
            if (index != -1)
            {
                rotas[index] = rota;
                SaveRotasToCache(rotas);
                return await Task.FromResult(rota);
            }
            return null;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var rotas = GetRotasFromCache();
            var rota = rotas.FirstOrDefault(r => r.Id == id);
            if (rota != null)
            {
                rotas.Remove(rota);
                SaveRotasToCache(rotas);
                return await Task.FromResult(true);
            }
            return await Task.FromResult(false);
        }

        public async Task<Rota> GetMelhorRotaAsync(string origem, string destino)
        {
            var rotas = GetRotasFromCache();
            return await Task.FromResult(rotas
                .Where(r => r.Origem == origem && (r.Destino == destino || r.conexoes.Contains(destino)))
                .OrderBy(r => r.Valor)
                .FirstOrDefault());
        }
    }
}
