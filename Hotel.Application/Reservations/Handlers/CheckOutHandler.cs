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
        var reservation = await _reservationRepo.GetByIdAsync(reservationId);

        if (reservation == null)
            throw new Exception("Reservation introuvable");

        if (reservation.Statut != ReservationStatus.CheckIn)
            throw new Exception("CheckOut impossible sans CheckIn");

        var tarif = await _tarifRepo.GetTarif(
            reservation.Chambre.Type,
            "Haute"
        );

        if (tarif == null)
            throw new Exception("Tarif non défini");

        var nights = (reservation.DateDepart - reservation.DateArrivee).Days;
        var total = nights * tarif.Prix;

        // 1. créer facture
        var facture = new Facture
        {
            Date = DateTime.Now,
            MontantTotal = total,
            Remise = 0,
            ReservationId = reservation.Id
        };

        // 2. changer statut
        reservation.Statut = ReservationStatus.CheckOut;

        // 3. IMPORTANT : update d'abord reservation
        await _reservationRepo.UpdateAsync(reservation);

        // 4. puis facture
        await _factureRepo.AddAsync(facture);
    }
}