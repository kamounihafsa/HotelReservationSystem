using Hotel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Domain.Interfaces
{
    public interface IReservationRepository
    {
        Task<Reservation> GetByIdAsync(long id);
        Task<IEnumerable<Reservation>> GetAllAsync();

        Task AddAsync(Reservation reservation);
        Task UpdateAsync(Reservation reservation);
        Task DeleteAsync(long id);

        
        Task<bool> IsChambreDisponible(long chambreId, DateTime dateArrivee, DateTime dateDepart);
        Task<IEnumerable<Reservation>> GetByClientId(long clientId);

    }
}
