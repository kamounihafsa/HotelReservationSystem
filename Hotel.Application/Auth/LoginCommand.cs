using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Application.Auth
{
    public class LoginCommand
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
