// PLUS / MINUS
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.toggle-info-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const extraInfo = this.nextElementSibling;
            if (extraInfo.style.display === 'none') {
                extraInfo.style.display = 'block';
                this.textContent = '−'; // Minus anzeigen
            } else {
                extraInfo.style.display = 'none';
                this.textContent = '+'; // Plus zurück
            }
        });
    });
});


// KALENDER + MODAL
document.addEventListener('DOMContentLoaded', function() {

    // Kalender-Container suchen – nur ausführen, wenn das Mask-Element auf der Seite ist
    var calendarEl = document.getElementById('kundenkalender');
    if (!calendarEl) {
        return; // Kein Kalender auf dieser Seite -> abbrechen
    }

    // FullCalendar initialisieren
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'de',
        height: 650,

        dateClick: function(info) {
            // Datum in das Formular eintragen
            var dateInput = document.getElementById('terminDatum');
            if (dateInput) {
                dateInput.value = info.dateStr;
            }

            // Modal öffnen (Bootstrap)
            var modalEl = document.getElementById('terminModal');
            if (modalEl && typeof bootstrap !== 'undefined') {
                var modal = new bootstrap.Modal(modalEl);
                modal.show();
            }
        }
    });

    calendar.render();

    // SENDEN BUTTON
    var sendenBtn = document.getElementById('sendenBtn');
    if (sendenBtn) {
        sendenBtn.addEventListener('click', function () {

            const datum = document.getElementById('terminDatum').value;
            const leistung = document.getElementById('leistung').value;
            const tiername = document.getElementById('tiername').value;
            const nachricht = document.getElementById('nachricht').value;

            if (!leistung || !tiername) {
                alert("Bitte Leistung und Tiername ausfüllen.");
                return;
            }

            // MAIL senden via mailto (einfachste Variante)
            const mail =
                "mailto:DEINE-EMAIL@domain.at"
                + "?subject=Termin%20Anfrage%20" + encodeURIComponent(datum)
                + "&body="
                + "Datum: " + encodeURIComponent(datum) + "%0D%0A"
                + "Leistung: " + encodeURIComponent(leistung) + "%0D%0A"
                + "Tiername: " + encodeURIComponent(tiername) + "%0D%0A"
                + "Nachricht: " + encodeURIComponent(nachricht || "");

            window.location.href = mail;
        });
    }

});
