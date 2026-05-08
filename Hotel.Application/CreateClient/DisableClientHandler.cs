using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Application.CreateClient
{
    public class DisableClientHandler
    {
        private readonly IClientRepository _repo;

        public DisableClientHandler(IClientRepository repo)
        {
            _repo = repo;
        }

        public async Task Handle(long id)
        {
            var client = await _repo.GetByIdAsync(id);

            client.Actif = false;

            await _repo.UpdateAsync(client);
        }
    }
}
