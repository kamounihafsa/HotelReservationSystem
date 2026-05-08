using Hotel.Application.Interfaces;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel.Application.Auth
{
    public class ChangePasswordHandler
    {
        private readonly IUserRepository _repo;
        private readonly IPasswordHasher _hasher;

        public ChangePasswordHandler(IUserRepository repo, IPasswordHasher hasher)
        {
            _repo = repo;
            _hasher = hasher;
        }

        public async Task Handle(ChangePasswordCommand command)
        {
            var user = await _repo.GetByUsername(command.Username);

            user.PasswordHash = _hasher.Hash(command.NewPassword);
            user.MustChangePassword = false;

            await _repo.UpdateAsync(user);
        }
    }
}
