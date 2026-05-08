using System;
using System.Collections.Generic;
using System.Text;
using Hotel.Domain.Enums;
using System.Text.Json.Serialization;

namespace Hotel.Domain.Entities
{
    public class Equipement
    {
        public long Id { get; set; }
        public string Nom { get; set; }

        public long ChambreId { get; set; }
        [JsonIgnore]
        public Chambre Chambre { get; set; }
    }
}
