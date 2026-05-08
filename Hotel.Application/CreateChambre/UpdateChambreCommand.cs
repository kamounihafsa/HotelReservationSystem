using Hotel.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Application.CreateChambre
{
    public class UpdateChambreCommand
    {

        public string Numero { get; set; }
        public TypeChambre Type { get; set; }
        public int Etage { get; set; }
        public int Capacite { get; set; }
        public string Description { get; set; }
    }
}
