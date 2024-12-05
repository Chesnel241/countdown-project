// Date cible : 24 juillet 2026, 00:00:00
const targetDate = new Date('2026-07-24T00:00:00');

const monthsEl = document.getElementById('months');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const oldValues = {
    months: null,
    days: null,
    hours: null,
    minutes: null,
    seconds: null
};

function updateCountdown() {
    const now = new Date();
    let diff = targetDate - now;

    if (diff <= 0) {
        monthsEl.textContent = 0;
        daysEl.textContent = 0;
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        return;
    }

    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth(); // 0-11
    let currentDay = now.getDate();

    let targetYear = targetDate.getFullYear();
    let targetMonth = targetDate.getMonth();
    let targetDay = targetDate.getDate();

    let months = (targetYear - currentYear) * 12 + (targetMonth - currentMonth);
    if (targetDay < currentDay) {
        months -= 1;
    }

    let tempDate = new Date(now);
    tempDate.setMonth(tempDate.getMonth() + months);
    let days = Math.floor((targetDate - tempDate) / (1000 * 60 * 60 * 24));

    let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((diff / (1000 * 60)) % 60);
    let seconds = Math.floor((diff / 1000) % 60);

    // Fonction pour mettre à jour le DOM et animer si changement
    function updateValue(element, newValue, key) {
        if (oldValues[key] !== newValue) {
            element.textContent = newValue;
            element.classList.add('change');
            setTimeout(() => {
                element.classList.remove('change');
            }, 500);
        } else {
            element.textContent = newValue;
        }
        oldValues[key] = newValue;
    }

    updateValue(monthsEl, months, 'months');
    updateValue(daysEl, days, 'days');
    updateValue(hoursEl, hours.toString().padStart(2, '0'), 'hours');
    updateValue(minutesEl, minutes.toString().padStart(2, '0'), 'minutes');
    updateValue(secondsEl, seconds.toString().padStart(2, '0'), 'seconds');
}

updateCountdown();
setInterval(updateCountdown, 1000);
