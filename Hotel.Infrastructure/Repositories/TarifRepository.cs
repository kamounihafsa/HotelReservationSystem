using Hotel.Domain.Entities;
using Hotel.Domain.Enums;
using Hotel.Domain.Interfaces;
using Hotel.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Infrastructure.Repositories
{
    public class TarifRepository : ITarifRepository
    {
        private readonly AppDbContext _context;

        public TarifRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Tarif> GetTarif(TypeChambre type, string saison)
        {
            return await _context.Tarifs
                .FirstOrDefaultAsync(t => t.TypeChambre == type && t.Saison == saison);
        }

        public async Task AddAsync(Tarif tarif)
        {
            await _context.Tarifs.AddAsync(tarif);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Tarif>> GetAllAsync()
        {
            return await _context.Tarifs.ToListAsync();
        }
    }
}
