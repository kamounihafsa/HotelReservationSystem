using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Application.CreateClient
{
    public class CreateClientCommand
    {
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string CIN { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
    }
}
