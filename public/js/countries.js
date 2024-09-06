document.addEventListener('alpine:init', () => {
    Alpine.store('countryData', {
        countries: [],
        async init() {
            try {
                const response = await fetch('/pageprops.json');
                const data = await response.json();
                this.countries = data.countries;
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        }
    });
});

// Trigger the initialization
document.addEventListener('DOMContentLoaded', () => {
    Alpine.store('countryData').init();
});
