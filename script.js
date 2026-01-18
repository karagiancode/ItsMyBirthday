// --- ΡΥΘΜΙΣΕΙΣ EVENT (ΕΔΩ ΕΛΕΓΧΕΙΣ ΤΑ ΠΑΝΤΑ) ---
const eventConfig = {
    // Προσοχή: Στους μήνες μετράμε από το 0 (Ιαν=0, Φεβ=1)
    year: 2026,
    month: 1, // Φεβρουάριος
    day: 6,
    hour: 21,
    minute: 0,
    title: "BIRTHDAY PARTY 2026",
    location: "Στρατηγού Μπραντούνα 3, Θεσσαλονίκη",
    details: "Σε περιμένω στο καλύτερο πάρτυ γενεθλίων!"
};

// --- 1. ΛΕΙΤΟΥΡΓΙΑ COUNTDOWN ---
// Δημιουργία της ημερομηνίας στόχου
const partyDate = new Date(eventConfig.year, eventConfig.month, eventConfig.day, eventConfig.hour, eventConfig.minute, 0).getTime();

const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = partyDate - now;

    // Υπολογισμοί χρόνου
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Εμφάνιση στο HTML
    const elDays = document.getElementById("days");
    if(elDays) {
        elDays.innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
    }

    // Αν περάσει η ημερομηνία
    if (distance < 0) {
        clearInterval(countdown);
        const cdContainer = document.getElementById("countdown");
        if(cdContainer) cdContainer.innerHTML = "<h2>IT'S PARTY TIME!</h2>";
    }
}, 1000);


// --- 2. ΛΕΙΤΟΥΡΓΙΑ ADD TO CALENDAR ---
const calendarBtn = document.getElementById('calendarBtn');

if (calendarBtn) {
    calendarBtn.addEventListener('click', function() {
        
        // Δημιουργία ημερομηνιών (Start & End)
        const startDate = new Date(eventConfig.year, eventConfig.month, eventConfig.day, eventConfig.hour, eventConfig.minute);
        // Ορίζουμε ότι το πάρτυ θα κρατήσει π.χ. 5 ώρες
        const endDate = new Date(startDate.getTime() + (5 * 60 * 60 * 1000)); 

        // Βοηθητική συνάρτηση για format ημερομηνίας Google (YYYYMMDDTHHmmss)
        const formatGoogleDate = (date) => {
            return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
        };

        const startStr = formatGoogleDate(startDate);
        const endStr = formatGoogleDate(endDate);

        // Δημιουργία URL για Google Calendar
        const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventConfig.title)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(eventConfig.details)}&location=${encodeURIComponent(eventConfig.location)}&sf=true&output=xml`;

        // Άνοιγμα σε νέο tab
        window.open(googleUrl, '_blank');
    });

}
