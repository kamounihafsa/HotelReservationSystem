using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Application.CreateClient
{
    public class UpdateClientCommand
    {
        public long Id { get; set; }
        public string Nom { get; set; }
        public string Telephone { get; set; }
    }
}
