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
    public class ReservationRepository : IReservationRepository
    {
        private readonly AppDbContext _context;

        public ReservationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Reservation reservation)
        {
            await _context.Reservations.AddAsync(reservation);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(long id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation != null)
            {
                _context.Reservations.Remove(reservation);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Reservation>> GetAllAsync()
        {
            return await _context.Reservations
                .Include(r => r.Client)
                .Include(r => r.Chambre)
                .Include(r => r.Facture)   // 🔥 IMPORTANT
                .ToListAsync();
        }

        public async Task<Reservation> GetByIdAsync(long id)
        {
            return await _context.Reservations
                .Include(r => r.Client)
                .Include(r => r.Chambre)
                .Include(r => r.Facture)   // 🔥 IMPORTANT
                .FirstOrDefaultAsync(r => r.Id == id) ?? throw new Exception("Reservation not found");

        }

        public async Task UpdateAsync(Reservation reservation)
        {
            _context.Reservations.Update(reservation);
            await _context.SaveChangesAsync();
        }

        // 🔥 IMPORTANT (logique métier clé)
        public async Task<bool> IsChambreDisponible(long chambreId, DateTime dateArrivee, DateTime dateDepart)
        {
            return !await _context.Reservations.AnyAsync(r =>
                r.ChambreId == chambreId &&
                r.Statut != ReservationStatus.Annulée &&
                (
                    dateArrivee < r.DateDepart &&
                    dateDepart > r.DateArrivee
                )
            );
        }
        public async Task<IEnumerable<Reservation>> GetByClientId(long clientId)
        {
            return await _context.Reservations
                .Where(r => r.ClientId == clientId)
                .Include(r => r.Chambre)
                .Include(r => r.Facture)
                .ToListAsync();
        }

        public async Task<Chambre> GetChambreById(long id)
        {
            return await _context.Chambres
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}

