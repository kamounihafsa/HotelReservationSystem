using Hotel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Application.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(Utilisateur user);
    }
}
