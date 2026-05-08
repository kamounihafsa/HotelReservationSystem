using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Application.CreateClient
{
    public class UpdateClientHandler
    {
        private readonly IClientRepository _repo;

        public UpdateClientHandler(IClientRepository repo)
        {
            _repo = repo;
        }

        public async Task Handle(UpdateClientCommand command)
        {
            var client = await _repo.GetByIdAsync(command.Id);

            client.Nom = command.Nom;
            client.Telephone = command.Telephone;

            await _repo.UpdateAsync(client);
        }
    }
}
