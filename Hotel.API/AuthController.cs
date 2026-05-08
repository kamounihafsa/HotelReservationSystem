using Hotel.Application.Auth;
using Microsoft.AspNetCore.Mvc;

namespace Hotel.API
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly LoginHandler _handler;

        public AuthController(LoginHandler handler)
        {
            _handler = handler;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginCommand command)
        {
            var result = await _handler.Handle(command);
            return Ok(result);
        }
    }
}
