using Hotel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Domain.Interfaces
{
    public interface IChambreRepository
    {
        Task<Chambre> GetByIdAsync(long id);
        Task<IEnumerable<Chambre>> GetAllAsync();

        Task AddAsync(Chambre chambre);
        Task UpdateAsync(Chambre chambre);
        Task DeleteAsync(long id);
        Task<IEnumerable<Chambre>> SearchAsync(string term);

        // 🔥 POUR DISPONIBILITÉ
        Task<IEnumerable<Chambre>> GetAvailableChambres(DateTime dateArrivee, DateTime dateDepart);
    }
}
