using Hotel.Domain.Entities;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Application.CreateClient
{
    public class GetClientReservationsHandler
    {
        private readonly IReservationRepository _repo;

        public GetClientReservationsHandler(IReservationRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Reservation>> Handle(long clientId)
        {
            return await _repo.GetByClientId(clientId);
        }
    }
}
