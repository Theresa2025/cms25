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


