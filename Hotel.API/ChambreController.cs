using Hotel.Domain.Entities;
using Hotel.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Hotel.Application.CreateChambre;

namespace Hotel.API
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Receptionniste")]
    public class ChambreController : ControllerBase
    {
        private readonly IChambreRepository _repo;

        public ChambreController(IChambreRepository repo)
        {
            _repo = repo;
        }

        // ➕ Ajouter chambre
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateChambreCommand command)
        {
            var chambre = new Chambre
            {
                Numero = command.Numero,
                Type = command.Type,
                Etage = command.Etage,
                Capacite = command.Capacite,
                Description = command.Description,
                Active = true
            };

            await _repo.AddAsync(chambre);

            return Ok(chambre);
        }

        // ✏️ Modifier chambre
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] UpdateChambreCommand command)
        {
            var chambre = await _repo.GetByIdAsync(id);

            if (chambre == null)
                return NotFound();

            chambre.Numero = command.Numero;
            chambre.Type = command.Type;
            chambre.Etage = command.Etage;
            chambre.Capacite = command.Capacite;
            chambre.Description = command.Description;

            await _repo.UpdateAsync(chambre);

            return Ok("Chambre modifiée");
        }

        // 🔴 Désactiver chambre
        [HttpDelete("{id}")]
        public async Task<IActionResult> Disable(long id)
        {
            var chambre = await _repo.GetByIdAsync(id);

            if (chambre == null)
                return NotFound();

            chambre.Active = false;

            await _repo.UpdateAsync(chambre);

            return Ok("Chambre désactivée");
        }

        [HttpPost("{id}/equipements")]
        public async Task<IActionResult> AddEquipement(long id, string nom)
        {
            var chambre = await _repo.GetByIdAsync(id);

            if (chambre == null)
                return NotFound();

            // 🔥 IMPORTANT
            if (chambre.Equipements == null)
            {
                chambre.Equipements = new List<Equipement>();
            }

            chambre.Equipements.Add(new Equipement
            {
                Nom = nom,
                ChambreId = chambre.Id
            });

            await _repo.UpdateAsync(chambre);

            return Ok("Equipement ajouté");
        }
        // 🔍 Recherche chambre
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string term)
        {
            if (string.IsNullOrWhiteSpace(term))
                return BadRequest("Le paramètre 'term' est obligatoire");

            var result = await _repo.SearchAsync(term);

            return Ok(result);
        }
        // 🟢 Réactiver chambre
        [HttpPost("{id}/reactivate")]
        public async Task<IActionResult> Reactivate(long id)
        {
            var chambre = await _repo.GetByIdAsync(id);

            if (chambre == null)
                return NotFound();

            chambre.Active = true;

            await _repo.UpdateAsync(chambre);

            return Ok("Chambre réactivée");
        }
    }
}