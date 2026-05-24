using Hotel.Domain.Entities;
using Hotel.Domain.Interfaces;
using Hotel.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Infrastructure.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly AppDbContext _context;

        public ClientRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Client client)
        {
            await _context.Clients.AddAsync(client);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(long id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client != null)
            {
                _context.Clients.Remove(client);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Client>> GetAllAsync()
        {
            return await _context.Clients.ToListAsync();
        }

        public async Task<Client> GetByIdAsync(long id)
        {
            return await _context.Clients.FindAsync(id);
        }

        public async Task UpdateAsync(Client client)
        {
            _context.Clients.Update(client);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Client>> Search(string term)
        {
            if (string.IsNullOrWhiteSpace(term))
                return await _context.Clients.ToListAsync();

            term = term.ToLower();

            return await _context.Clients
                .Where(c =>
                    (c.Nom != null && c.Nom.ToLower().Contains(term)) ||
                    (c.Telephone != null && c.Telephone.Contains(term)) ||
                    (c.NumeroIdentite != null && c.NumeroIdentite.Contains(term))
                )
                .ToListAsync();
        }
        public async Task<Client> GetByCIN(string cin)
        {
            return await _context.Clients
                .FirstOrDefaultAsync(c => c.NumeroIdentite == cin);
        }

        public async Task<bool> CINExists(string cin)
        {
            return await _context.Clients
                .AnyAsync(c => c.NumeroIdentite == cin);
        }

        public async Task<IEnumerable<Client>> GetActiveClients()
        {
            return await _context.Clients
                .Where(c => c.Actif)
                .ToListAsync();
        }
        public async Task<IEnumerable<Reservation>> GetReservationsByClientId(long clientId)
        {
            return await _context.Reservations
                .Include(r => r.Facture)
                .Where(r => r.ClientId == clientId)
                .Include(r => r.Chambre) // optionnel mais recommandé
                .OrderByDescending(r => r.DateArrivee)
                .ToListAsync();
        }
    }
}
