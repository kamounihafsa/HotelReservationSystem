using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Application.Reservations.Commands
{
    public class CreateReservationCommand
    {
        public long ClientId { get; set; }
        public long ChambreId { get; set; }
        public DateTime DateArrivee { get; set; }
        public DateTime DateDepart { get; set; }
        public int NombrePersonnes { get; set; }
        public double Remise { get; set; }
    }
}
