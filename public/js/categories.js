document.addEventListener('alpine:init', () => {
    Alpine.store('visaData', {
        categories: [],
        async init() {
            try {
                const response = await fetch('/public/pageprops.json');
                const data = await response.json();
                this.categories = data.visaCategories;
            } catch (error) {
                console.error('Error fetching visa categories:', error);
            }
        }
    });
});

// Trigger the initialization
document.addEventListener('DOMContentLoaded', () => {
    Alpine.store('visaData').init();
});
