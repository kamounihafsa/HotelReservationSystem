using Hotel.Domain.Entities;
using Hotel.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Domain.Interfaces
{
    public interface ITarifRepository
    {
        Task<Tarif> GetTarif(TypeChambre type, string saison);
        Task AddAsync(Tarif tarif);
        Task<IEnumerable<Tarif>> GetAllAsync();
    }
}
