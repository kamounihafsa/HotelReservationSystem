using Hotel.Domain.Entities;
using Hotel.Domain.Interfaces;
using Hotel.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Utilisateur> GetByUsername(string username)
        {
            return await _context.Utilisateurs
                .FirstOrDefaultAsync(u => u.Username == username)
                ?? throw new Exception("Utilisateur introuvable");
        }
        public async Task AddAsync(Utilisateur user)
        {
            await _context.Utilisateurs.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Utilisateur user)
        {
            _context.Utilisateurs.Update(user);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Utilisateur>> GetAllAsync()
        {
            return await _context.Utilisateurs.ToListAsync();
        }

        public async Task<Utilisateur> GetByIdAsync(long id)
        {
            return await _context.Utilisateurs
                .FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}
