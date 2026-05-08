using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;


namespace Hotel.Domain.Entities
{
    public class Facture
    {
        public long Id { get; set; }

        public DateTime Date { get; set; }

        public double MontantTotal { get; set; }

        public double Remise { get; set; }

        // 🔥 nullable
        public long? ReservationId { get; set; }
        [JsonIgnore]

        public Reservation? Reservation { get; set; }
    }
}

