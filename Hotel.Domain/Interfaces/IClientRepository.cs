using Hotel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Interfaces
{
    public interface IClientRepository
    {
        Task<Client> GetByIdAsync(long id);
        Task<IEnumerable<Client>> GetAllAsync();
        Task AddAsync(Client client);
        Task UpdateAsync(Client client);
        Task DeleteAsync(long id);
        Task<IEnumerable<Client>> Search(string term);
        Task<Client> GetByCIN(string cin);
        Task<bool> CINExists(string cin);
        Task<IEnumerable<Client>> GetActiveClients();
        Task<IEnumerable<Reservation>> GetReservationsByClientId(long clientId);
    }
}
