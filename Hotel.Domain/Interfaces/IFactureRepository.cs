using Hotel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Domain.Interfaces
{
    public interface IFactureRepository
    {
        Task<Facture?> GetByIdAsync(long id);
        Task AddAsync(Facture facture);

        Task<IEnumerable<Facture>> GetByClientId(long clientId);
    }
}
