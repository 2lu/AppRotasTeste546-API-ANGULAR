using ApiRotas.Models;
using ApiRotas.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ApiRotas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RotasController : ControllerBase
    {
        private readonly IRotaRepository _rotaRepository;

        public RotasController(IRotaRepository rotaRepository)
        {
            _rotaRepository = rotaRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rota>>> GetAllRotas()
        {
            var rotas = await _rotaRepository.GetAllAsync();
            return Ok(rotas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Rota>> GetRotaById(Guid id)
        {
            var rota = await _rotaRepository.GetByIdAsync(id);
            if (rota == null)
            {
                return NotFound();
            }
            return Ok(rota);
        }

        [HttpPost]
        public async Task<ActionResult<Rota>> CreateRota(Rota rota)
        {
            var createdRota = await _rotaRepository.CreateAsync(rota);
            return CreatedAtAction(nameof(GetRotaById), new { id = createdRota.Id }, createdRota);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRota(Guid id, Rota rota)
        {
            if (id != rota.Id)
            {
                return BadRequest();
            }

            var updatedRota = await _rotaRepository.UpdateAsync(rota);
            if (updatedRota == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRota(Guid id)
        {
            var result = await _rotaRepository.DeleteAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpGet("consultar_melhor_rota")]
        public async Task<ActionResult<Rota>> ConsultarMelhorRota([FromQuery] string origem, [FromQuery] string destino)
        {
            var melhorRota = await _rotaRepository.GetMelhorRotaAsync(origem, destino);
            if (melhorRota == null)
            {
                return NotFound();
            }
            return Ok(melhorRota);
        }
    }
}