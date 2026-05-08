using System;
using System.Collections.Generic;
using System.Text;
using Hotel.Domain.Enums;
using Hotel.Domain.Enums;

namespace Hotel.Domain.Entities
{
    public class Client
    {
        public long Id { get; set; }
        public string Nom { get; set; } = string.Empty;
        public string Prenom { get; set; } = string.Empty;
        public string Telephone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Adresse { get; set; } = string.Empty;
        public string NumeroIdentite { get; set; } = string.Empty;
        public bool Actif { get; set; } = true; 

        public ICollection<Reservation> Reservations { get; set; }  
    }
}
