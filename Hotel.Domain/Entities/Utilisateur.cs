using System;
using System.Collections.Generic;
using System.Text;
using Hotel.Domain.Enums;

namespace Hotel.Domain.Entities
{
    public class Utilisateur
    {
        public long Id { get; set; }

        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;

        // 🔥 IMPORTANT
        public bool MustChangePassword { get; set; } = true;

        public bool Actif { get; set; } = true;
    }
}
