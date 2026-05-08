using Hotel.Domain.Entities;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Application.CreateClient
{
    public class ClientLoginHandler
    {
        private readonly IClientRepository _repo;

        public ClientLoginHandler(IClientRepository repo)
        {
            _repo = repo;
        }

        public async Task<Client> Handle(ClientLoginCommand command)
        {
            var client = await _repo.GetByCIN(command.CIN);

            if (client == null || client.Nom != command.Nom)
                throw new Exception("Client introuvable");

            return client;
        }
    }
}
