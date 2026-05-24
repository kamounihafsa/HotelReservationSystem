using Hotel.Domain.Entities;
using Hotel.Domain.Enums;
using Hotel.Domain.Interfaces;

public class CheckOutHandler
{
    private readonly IReservationRepository _reservationRepo;
    private readonly IFactureRepository _factureRepo;
    private readonly ITarifRepository _tarifRepo;

    public CheckOutHandler(
        IReservationRepository reservationRepo,
        IFactureRepository factureRepo,
        ITarifRepository tarifRepo)
    {
        _reservationRepo = reservationRepo;
        _factureRepo = factureRepo;
        _tarifRepo = tarifRepo;
    }

    public async Task Handle(long reservationId)
    {
        var reservation =
            await _reservationRepo.GetByIdAsync(reservationId);

        if (reservation == null)
            throw new Exception("Reservation introuvable");

        if (reservation.Statut != ReservationStatus.CheckIn)
            throw new Exception("CheckOut impossible");

        // 🔥 déterminer saison automatiquement
        var month = reservation.DateArrivee.Month;

        string saison;

        if (month >= 6 && month <= 8)
        {
            saison = "Haute";
        }
        else if (
            month == 3 ||
            month == 4 ||
            month == 5 ||
            month == 9 ||
            month == 10
        )
        {
            saison = "Intermediaire";
        }
        else
        {
            saison = "Basse";
        }

        // 🔥 récupérer tarif
        var tarif = await _tarifRepo.GetTarif(
            reservation.Chambre.Type,
            saison
        );

        if (tarif == null)
            throw new Exception("Tarif introuvable");

        // 🔥 nombre nuits
        var nights =
            (reservation.DateDepart - reservation.DateArrivee).Days;

        // 🔥 total brut
        var totalBrut = nights * tarif.Prix;

        // 🔥 remise
        var remiseMontant =
            totalBrut * reservation.Remise / 100;

        // 🔥 total final
        var totalFinal =
            totalBrut - remiseMontant;

        // 🔥 créer facture
        var facture = new Facture
        {
            Date = DateTime.Now,
            MontantTotal = totalFinal,
            Remise = reservation.Remise,
            ReservationId = reservation.Id
        };

        // 🔥 statut
        reservation.Statut = ReservationStatus.CheckOut;

        await _reservationRepo.UpdateAsync(reservation);

        await _factureRepo.AddAsync(facture);
    }
}