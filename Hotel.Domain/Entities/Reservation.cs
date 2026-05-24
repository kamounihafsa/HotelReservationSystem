using System;
using System.Collections.Generic;
using System.Text;
using Hotel.Domain.Enums;

namespace Hotel.Domain.Entities
{
    public class Reservation
    {
        public long Id { get; set; }

        public DateTime DateArrivee { get; set; }
        public DateTime DateDepart { get; set; }
        public int NombrePersonnes { get; set; }
        public double Remise { get; set; }

        public ReservationStatus Statut { get; set; }

        public long ClientId { get; set; }
        public Client Client { get; set; }

        public long ChambreId { get; set; }
        public Chambre Chambre { get; set; }

        public Facture? Facture { get; set; }
    }
}
