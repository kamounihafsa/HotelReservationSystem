using System;
using System.Collections.Generic;
using System.Text;
using Hotel.Domain.Enums;

namespace Hotel.Domain.Entities
{
    public class Tarif
    {
        public long Id { get; set; }
        public TypeChambre TypeChambre { get; set; }
        public string Saison { get; set; }
        public double Prix { get; set; }
    }
}
