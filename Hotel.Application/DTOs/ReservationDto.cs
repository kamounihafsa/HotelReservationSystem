using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Application.DTOs
{
    public class ReservationDto
    {
        public long Id { get; set; }
        public DateTime DateArrivee { get; set; }
        public DateTime DateDepart { get; set; }

        public string ChambreNumero { get; set; }
        public double MontantTotal { get; set; }
        public double Remise { get; set; }
    }
}
