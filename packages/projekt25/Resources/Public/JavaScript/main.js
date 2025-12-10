document.addEventListener("DOMContentLoaded", function () {
    console.log("Main JS wird geladen");

    // ------------------------------------------------------
    // PLUS / MINUS BUTTONS
    // ------------------------------------------------------
    const buttons = document.querySelectorAll('.toggle-info-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            const extraInfo = this.nextElementSibling;
            if (extraInfo.style.display === 'none') {
                extraInfo.style.display = 'block';
                this.textContent = '−';
            } else {
                extraInfo.style.display = 'none';
                this.textContent = '+';
            }
        });
    });

    // ------------------------------------------------------
    // KALENDER INITIALISIEREN
    // ------------------------------------------------------
    console.log("Kalender-Initialisierung startet…");

    const calendarEls = document.querySelectorAll(".kundenkalender");

    if (!calendarEls.length) {
        console.warn("Kein Kalender-Container gefunden!");
        return;
    }

    calendarEls.forEach(function (el) {

        const uid = el.getAttribute("data-uid");

        const modalEl = document.getElementById(`terminModal-${uid}`);
        const modalForm = document.getElementById(`terminForm-${uid}`);

        const datumInput = document.getElementById(`terminDatum-${uid}`);
        const nameInput = document.getElementById(`terminName-${uid}`);
        const leistungInput = document.getElementById(`terminLeistung-${uid}`);
        const kommentarInput = document.getElementById(`terminKommentar-${uid}`);

        const modal = new bootstrap.Modal(modalEl);

        const calendar = new FullCalendar.Calendar(el, {
            initialView: "dayGridMonth",
            selectable: true,
            locale: "de",
            firstDay: 1,
            dateClick: function (info) {

                const wochentag = info.date.getDay();

                if (wochentag === 0 || wochentag === 6) {
                    alert("Es können nur Termine von Montag bis Freitag gebucht werden.");
                    return;
                }

                datumInput.value = info.dateStr;
                nameInput.value = "";
                leistungInput.value = "";
                kommentarInput.value = "";

                modal.show();
            }
        });

        calendar.render();

        // FORMULAR SENDEN → MAIL ÖFFNEN
        modalForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const datum = datumInput.value;
            const name = nameInput.value;
            const telefon = document.getElementById(`terminTelefon-${uid}`).value;
            const leistung = leistungInput.value;
            const kommentar = kommentarInput.value;

            // Pflichtfelder prüfen
            if (!datum || !name || !leistung || !telefon) {
                alert("Bitte alle Pflichtfelder ausfüllen.");
                return;
            }

            // mailto-Link erzeugen
            const mailto =
                `mailto:s2410456015@fhooe.at` +
                `?subject=Termin Anfrage am ${datum}` +
                `&body=Name: ${encodeURIComponent(name)}` +
                `%0D%0ATelefon: ${encodeURIComponent(telefon)}` +
                `%0D%0ALeistung: ${encodeURIComponent(leistung)}` +
                `%0D%0ADatum: ${encodeURIComponent(datum)}` +
                `%0D%0AKommentar: ${encodeURIComponent(kommentar)}`;

            window.location.href = mailto;

            modal.hide();
        });
    });
});
