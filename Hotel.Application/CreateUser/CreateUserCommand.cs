using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Application.CreateUser
{
    public class CreateUserCommand
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } // Admin ou Receptionniste
    }
}
