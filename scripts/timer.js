document.addEventListener('DOMContentLoaded', function() {
    function getEventDate() {
        const targetOffsetMinutes = -180; // Волгоград UTC+3
        const now = new Date();
        const userOffset = now.getTimezoneOffset();
        const diffMinutes = targetOffsetMinutes - userOffset;
        const eventUTC = new Date(Date.UTC(2026, 5, 21, 14, 0, 0));
        const adjustedEvent = new Date(eventUTC.getTime() + diffMinutes * 60 * 1000);
        return adjustedEvent;
    }

    let eventDate = getEventDate();
    let timerInterval;

    function updateTimer() {
        const now = new Date();
        const diff = eventDate - now;

        if (diff <= 0) {
            clearInterval(timerInterval);
            const timerElement = document.getElementById('timerDigits');
            if (timerElement) {
                timerElement.innerHTML = '<div class="timer-expired">Событие уже началось! Ждём тебя 🎳</div>';
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (86400000)) / (3600000));
        const minutes = Math.floor((diff % 3600000) / 60000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');

        if (daysEl) daysEl.innerText = days;
        if (hoursEl) hoursEl.innerText = hours;
        if (minutesEl) minutesEl.innerText = minutes;
    }

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
});