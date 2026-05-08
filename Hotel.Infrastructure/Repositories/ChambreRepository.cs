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
    public class ChambreRepository : IChambreRepository
    {
        private readonly AppDbContext _context;

        public ChambreRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Chambre chambre)
        {
            await _context.Chambres.AddAsync(chambre);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(long id)
        {
            var chambre = await _context.Chambres.FindAsync(id);

            if (chambre != null)
            {
                chambre.Active = false; 
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Chambre>> GetAllAsync()
        {
            return await _context.Chambres
                .Where(c => c.Active)
                .Include(c => c.Equipements)
                .ToListAsync();
        }

        public async Task<Chambre> GetByIdAsync(long id)
        {
            return await _context.Chambres
                .Include(c => c.Equipements)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task UpdateAsync(Chambre chambre)
        {
            _context.Chambres.Update(chambre);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Chambre>> GetAvailableChambres(DateTime dateArrivee, DateTime dateDepart)
        {
            var chambresOccupees = await _context.Reservations
                .Where(r => r.Statut != ReservationStatus.Annulée &&
                            dateArrivee < r.DateDepart &&
                            dateDepart > r.DateArrivee)
                .Select(r => r.ChambreId)
                .ToListAsync();

            return await _context.Chambres
                .Where(c => c.Active && !chambresOccupees.Contains(c.Id))
                .Include(c => c.Equipements)
                .ToListAsync();
        }
        public async Task<IEnumerable<Chambre>> SearchAsync(string term)
        {
            term = term?.ToLower() ?? "";

            return await _context.Chambres
                .Where(c =>
                    c.Numero.ToLower().Contains(term) ||
                    (c.Description != null &&
                     c.Description.ToLower().Contains(term))
                )
                .Include(c => c.Equipements)
                .ToListAsync();
        }
    }
}
