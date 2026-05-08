using Hotel.Domain.Enums;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Application.Reservations.Handlers
{
    public class CancelReservationHandler
    {
        private readonly IReservationRepository _repo;

        public CancelReservationHandler(IReservationRepository repo)
        {
            _repo = repo;
        }

        public async Task Handle(long id)
        {
            var reservation = await _repo.GetByIdAsync(id);

            if (reservation == null)
                throw new Exception("Reservation introuvable");

            reservation.Statut = ReservationStatus.Annulée;

            await _repo.UpdateAsync(reservation);
        }
    }
}
