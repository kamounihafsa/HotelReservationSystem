using Hotel.Application.Reservations.Commands;
using Hotel.Domain.Entities;
using Hotel.Domain.Enums;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Application.Reservations.Handlers
{
    public class CreateReservationHandler
    {
        private readonly IReservationRepository _reservationRepo;

        public CreateReservationHandler(IReservationRepository reservationRepo)
        {
            _reservationRepo = reservationRepo;
        }

        public async Task<long> Handle(CreateReservationCommand command)
        {

            if (command.DateArrivee >= command.DateDepart)
            {
                throw new Exception(
                    "Date invalide : la date d'arrivée doit être inférieure à la date de départ. Veuillez réécrire les dates."
                );
            }
            var chambre = await _reservationRepo.GetChambreById(command.ChambreId);

            if (chambre == null)
                throw new Exception("Chambre introuvable");

            // 🔥 vérifier capacité
            if (command.NombrePersonnes > chambre.Capacite)
            {
                throw new Exception(
                    $"Cette chambre accepte seulement {chambre.Capacite} personnes"
                );
            }

            var disponible = await _reservationRepo.IsChambreDisponible(
                command.ChambreId,
                command.DateArrivee,
                command.DateDepart);

            if (!disponible)
                throw new Exception("Chambre non disponible");

            var reservation = new Reservation
            {
                ClientId = command.ClientId,
                ChambreId = command.ChambreId,
                DateArrivee = command.DateArrivee,
                DateDepart = command.DateDepart,
                NombrePersonnes = command.NombrePersonnes,
                Remise = command.Remise,
                Statut = ReservationStatus.Confirmée
            };

            await _reservationRepo.AddAsync(reservation);

            return reservation.Id;
        }
    }
}
