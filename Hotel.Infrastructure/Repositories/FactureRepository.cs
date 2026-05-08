using Hotel.Domain.Entities;
using Hotel.Domain.Interfaces;
using Hotel.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Infrastructure.Repositories
{
    public class FactureRepository : IFactureRepository
    {
        private readonly AppDbContext _context;

        public FactureRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Facture facture)
        {
            _context.Factures.Add(facture);
            await _context.SaveChangesAsync();
        }

        public async Task<Facture?> GetByIdAsync(long id)
        {
            return await _context.Factures.FindAsync(id);
        }

        public async Task<IEnumerable<Facture>> GetByClientId(long clientId)
        {
            return await _context.Factures
                .Include(f => f.Reservation)
                .Where(f => f.Reservation != null && f.Reservation.ClientId == clientId)
                .ToListAsync();
        }


    }
}
