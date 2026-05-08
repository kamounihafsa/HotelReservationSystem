using Hotel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<Utilisateur> GetByUsername(string username);

        // 🔥 AJOUTER CES MÉTHODES
        Task AddAsync(Utilisateur user);
        Task UpdateAsync(Utilisateur user);
        Task<IEnumerable<Utilisateur>> GetAllAsync();
        Task<Utilisateur> GetByIdAsync(long id);
    }
}
