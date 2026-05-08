using Hotel.Application.Reservations.Commands;
using Hotel.Application.Reservations.Handlers;
using Hotel.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hotel.API
{
    [Authorize(Roles = "Receptionniste")]
    [ApiController]
    [Route("api/reservations")]
    public class ReservationController : ControllerBase
    {
        private readonly CreateReservationHandler _createHandler;
        private readonly CancelReservationHandler _cancelHandler;
        private readonly CheckInHandler _checkInHandler;
        private readonly CheckOutHandler _checkOutHandler;
        private readonly IReservationRepository _repo;



        public ReservationController(
            IReservationRepository repo,
            CreateReservationHandler createHandler,
            CancelReservationHandler cancelHandler,
            CheckInHandler checkInHandler,
            CheckOutHandler checkOutHandler)
        {
            _repo = repo;

            _createHandler = createHandler;
            _cancelHandler = cancelHandler;
            _checkInHandler = checkInHandler;
            _checkOutHandler = checkOutHandler;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateReservationCommand command)
        {
            try
            {
                var id = await _createHandler.Handle(command);
                return Ok(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{id}/cancel")]
        public async Task<IActionResult> Cancel(long id)
        {
            try
            {
                await _cancelHandler.Handle(id);
                return Ok("Réservation annulée");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{id}/checkin")]
        public async Task<IActionResult> CheckIn(long id)
        {
            try
            {
                await _checkInHandler.Handle(id);
                return Ok("Check-In effectué");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{id}/checkout")]
        public async Task<IActionResult> CheckOut(long id)
        {
            try
            {
                await _checkOutHandler.Handle(id);
                return Ok("Check-Out + facture générée");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reservations = await _repo.GetAllAsync();

            return Ok(
                reservations.Select(r => new
                {
                    r.Id,
                    r.DateArrivee,
                    r.DateDepart,
                    r.NombrePersonnes,
                    Statut = r.Statut.ToString(),

                    Client = r.Client.Nom + " " + r.Client.Prenom,
                    Chambre = r.Chambre.Numero,

                    Facture = r.Facture == null
                        ? null
                        : new
                        {
                            r.Facture.Id,
                            r.Facture.Date,
                            r.Facture.MontantTotal,
                            r.Facture.Remise
                        }
                })
            );
        }
    }
}
