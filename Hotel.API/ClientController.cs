using Hotel.Application.CreateClient;
using Hotel.Application.DTOs;
using Hotel.Domain.Entities;
using Hotel.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hotel.API
{
    [Authorize(Roles = "Receptionniste")]
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IClientRepository _repo;

        public ClientController(IClientRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var clients = await _repo.GetAllAsync();
            return Ok(clients);
        }

        // 🔍 recherche
        [HttpGet("search")]
        public async Task<IActionResult> Search(string term)
        {
            var result = await _repo.Search(term);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateClientCommand command)
        {
            if (await _repo.CINExists(command.CIN))
                return BadRequest("CIN déjà utilisé");

            var client = new Client
            {
                Nom = command.Nom,
                Prenom = command.Prenom,
                NumeroIdentite = command.CIN,
                Telephone = command.Telephone,
                Email = command.Email,
                Actif = true
            };

            await _repo.AddAsync(client);

            return Ok("Client créé avec succès");
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, UpdateClientCommand command)
        {
            var client = await _repo.GetByIdAsync(id);

            if (client == null)
                return NotFound();

            client.Nom = command.Nom;
            client.Telephone = command.Telephone;

            await _repo.UpdateAsync(client);

            return Ok("Client modifié");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Disable(long id)
        {
            var client = await _repo.GetByIdAsync(id);

            if (client == null)
                return NotFound();

            client.Actif = false;

            await _repo.UpdateAsync(client);

            return Ok("Client désactivé");
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(ClientLoginCommand command)
        {
            var client = await _repo.GetByCIN(command.CIN);

            if (client == null || client.Nom != command.Nom)
                return Unauthorized("Client introuvable");

            return Ok(client);
        }
        [HttpGet("{id}/reservations")]
        public async Task<IActionResult> GetReservations(long id)
        {
            var reservations = await _repo.GetReservationsByClientId(id);
            return Ok(reservations);
        }
        [AllowAnonymous]
        [HttpPost("mes-reservations")]
        public async Task<IActionResult> GetMyReservations(ClientLoginCommand command)
        {
            var client = await _repo.GetByCIN(command.CIN);

            if (client == null || client.Nom != command.Nom)
                return Unauthorized("Client introuvable");

            var reservations = await _repo.GetReservationsByClientId(client.Id);

            var result = reservations.Select(r => new ReservationDto
            {
                Id = r.Id,
                DateArrivee = r.DateArrivee,
                DateDepart = r.DateDepart,
                ChambreNumero = r.Chambre.Numero,
                MontantTotal =
        r.Facture != null
            ? r.Facture.MontantTotal
            : 0
            });

            return Ok(result);
        }
        [HttpPost("{id}/reactivate")]
        public async Task<IActionResult> Reactivate(long id)
        {
            var client = await _repo.GetByIdAsync(id);

            if (client == null)
                return NotFound();

            client.Actif = true;

            await _repo.UpdateAsync(client);

            return Ok("Client réactivé");
        }

    }
}
