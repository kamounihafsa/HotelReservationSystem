using System;
using System.Collections.Generic;
using System.Text;
using Hotel.Domain.Enums;

namespace Hotel.Domain.Entities
{
    public class Chambre
    {
        public long Id { get; set; }
        public string Numero { get; set; }
        public TypeChambre Type { get; set; }
        public int Etage { get; set; }
        public int Capacite { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }

        public ICollection<Equipement> Equipements { get; set; }
    }
}
