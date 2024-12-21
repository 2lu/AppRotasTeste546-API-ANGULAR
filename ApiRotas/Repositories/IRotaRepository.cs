using ApiRotas.Models;

namespace ApiRotas.Repositories
{
    public interface IRotaRepository
    {
        Task<IEnumerable<Rota>> GetAllAsync();
        Task<Rota> GetByIdAsync(Guid id);
        Task<Rota> CreateAsync(Rota rota);
        Task<Rota> UpdateAsync(Rota rota);
        Task<bool> DeleteAsync(Guid id);
        Task<Rota> GetMelhorRotaAsync(string origem, string destino);
    }
}