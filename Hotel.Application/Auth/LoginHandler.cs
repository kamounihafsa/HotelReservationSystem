using Hotel.Application.Auth;
using Hotel.Application.Interfaces;
using Hotel.Domain.Interfaces;

public class LoginHandler
{
    private readonly IUserRepository _userRepo;
    private readonly IJwtService _jwt;
    private readonly IPasswordHasher _hasher;

    public LoginHandler(
        IUserRepository userRepo,
        IJwtService jwt,
        IPasswordHasher hasher)
    {
        _userRepo = userRepo;
        _jwt = jwt;
        _hasher = hasher;
    }

    public async Task<object> Handle(LoginCommand command)
    {
        var user = await _userRepo.GetByUsername(command.Username);

        if (user == null || !_hasher.Verify(command.Password, user.PasswordHash))
            throw new Exception("Invalid credentials");

        if (!user.Actif)
            throw new Exception("User disabled");

        var token = _jwt.GenerateToken(user);

        return new
        {
            Token = token,
            MustChangePassword = user.MustChangePassword
        };
    }
}