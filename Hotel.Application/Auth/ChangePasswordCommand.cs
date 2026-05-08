using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Application.Auth
{
    public class ChangePasswordCommand
    {
        public string Username { get; set; }
        public string NewPassword { get; set; }
    }
}
