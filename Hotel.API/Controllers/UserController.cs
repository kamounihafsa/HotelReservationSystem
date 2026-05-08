using Hotel.Application.Auth;
using Hotel.Application.CreateUser;
using Hotel.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Hotel.Application.Interfaces;

namespace Hotel.API.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly CreateUserHandler _createHandler;
        private readonly ChangePasswordHandler _changePasswordHandler;
        private readonly IUserRepository _repo;
        private readonly IPasswordHasher _hasher;

        public UserController(
            CreateUserHandler createHandler,
            ChangePasswordHandler changePasswordHandler,
            IUserRepository repo,
            IPasswordHasher hasher)
        {
            _createHandler = createHandler;
            _changePasswordHandler = changePasswordHandler;
            _repo = repo;
            _hasher = hasher;
        }

        // 🔐 ADMIN ONLY
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(CreateUserCommand command)
        {
            try
            {
                await _createHandler.Handle(command);

                return Ok("Utilisateur créé avec succès");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // 🔐 TOUS LES UTILISATEURS CONNECTÉS
       
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordCommand command)
        {
            await _changePasswordHandler.Handle(command);
            return Ok("Mot de passe modifié");
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _repo.GetAllAsync();

            return Ok(users);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, CreateUserCommand command)
        {
            var user = await _repo.GetByIdAsync(id);

            if (user == null)
                return NotFound();

            user.Username = command.Username;
            user.Role = command.Role;

            if (!string.IsNullOrWhiteSpace(command.Password))
            {
                user.PasswordHash = _hasher.Hash(command.Password);
            }

            await _repo.UpdateAsync(user);

            return Ok(user);
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Disable(long id)
        {
            var user = await _repo.GetByIdAsync(id);

            if (user == null)
                return NotFound();

            user.Actif = false;

            await _repo.UpdateAsync(user);

            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("{id}/reactivate")]
        public async Task<IActionResult> Reactivate(long id)
        {
            var user = await _repo.GetByIdAsync(id);

            if (user == null)
                return NotFound();

            user.Actif = true;

            await _repo.UpdateAsync(user);

            return Ok();
        }
    }
}