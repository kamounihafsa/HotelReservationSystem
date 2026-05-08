using Hotel.Application.Interfaces;
using Hotel.Domain.Entities;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Application.CreateUser
{
    public class CreateUserHandler
    {
        private readonly IUserRepository _repo;
        private readonly IPasswordHasher _hasher;

        public CreateUserHandler(
            IUserRepository repo,
            IPasswordHasher hasher)
        {
            _repo = repo;
            _hasher = hasher;
        }

        public async Task Handle(CreateUserCommand command)
        {
            // 🔥 vérifier username existe déjà
            try
            {
                var existingUser =
                    await _repo.GetByUsername(command.Username);

                if (existingUser != null)
                {
                    throw new Exception(
                        "Cet utilisateur existe déjà"
                    );
                }
            }
            catch
            {
                // utilisateur non trouvé => OK
            }

            // 🔥 vérifier mot de passe
            if (command.Password.Length < 6)
            {
                throw new Exception(
                    "Le mot de passe doit contenir au moins 6 caractères"
                );
            }

            var user = new Utilisateur
            {
                Username = command.Username,
                PasswordHash = _hasher.Hash(command.Password),
                Role = command.Role,
                MustChangePassword = true,
                Actif = true
            };

            await _repo.AddAsync(user);
        }
    }
}