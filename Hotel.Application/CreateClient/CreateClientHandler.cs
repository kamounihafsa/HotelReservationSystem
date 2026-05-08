using Hotel.Domain.Entities;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Application.CreateClient
{
    public class CreateClientHandler
    {
        private readonly IClientRepository _repo;

        public CreateClientHandler(IClientRepository repo)
        {
            _repo = repo;
        }

        public async Task Handle(CreateClientCommand command)
        {
            // 🔥 CIN UNIQUE
            if (await _repo.CINExists(command.CIN))
                throw new Exception("CIN déjà utilisé");

            var client = new Client
            {
                Nom = command.Nom,
                Prenom = command.Prenom,
                NumeroIdentite = command.CIN,
                Telephone = command.Telephone,
                Email = command.Email,
                Actif = true
            };

            await _repo.AddAsync(client);
        }
    }
}
