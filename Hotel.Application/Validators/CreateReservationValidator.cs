using FluentValidation;
using Hotel.Application.Reservations.Commands;

public class CreateReservationValidator : AbstractValidator<CreateReservationCommand>
{
    public CreateReservationValidator()
    {
        RuleFor(x => x.ClientId)
            .NotEmpty().WithMessage("Client obligatoire");

        RuleFor(x => x.ChambreId)
            .NotEmpty().WithMessage("Chambre obligatoire");

        RuleFor(x => x.DateArrivee)
            .LessThan(x => x.DateDepart)
            .WithMessage("Date arrivée doit être avant date départ");

        RuleFor(x => x.NombrePersonnes)
            .GreaterThan(0)
            .WithMessage("Nombre de personnes invalide");
    }
}