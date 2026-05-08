using Hotel.Application.Interfaces;
using Hotel.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Client> Clients { get; set; }
        public DbSet<Chambre> Chambres { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Facture> Factures { get; set; }

        public DbSet<Utilisateur> Utilisateurs { get; set; }

        public DbSet<Tarif> Tarifs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Facture)
                .WithOne(f => f.Reservation)
                .HasForeignKey<Facture>(f => f.ReservationId)
                .OnDelete(DeleteBehavior.Cascade);
        }
        public static async Task SeedAdmin(AppDbContext context, IPasswordHasher hasher)
        {
            if (!context.Utilisateurs.Any())
            {
                var admin = new Utilisateur
                {
                    Username = "admin",
                    PasswordHash = hasher.Hash("admin123"),
                    Role = "Admin",
                    MustChangePassword = false
                };

                context.Utilisateurs.Add(admin);
                await context.SaveChangesAsync();
            }
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
    }
}
