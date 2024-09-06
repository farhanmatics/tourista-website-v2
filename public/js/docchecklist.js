document.addEventListener('alpine:init', () => {
    Alpine.store('docChecklistData', {
        checklist: [],
        async fetchChecklist() {
            try {
                const response = await fetch('/public/docchecklist.json');
                const data = await response.json();
                this.checklist = data.data;
            } catch (error) {
                console.error('Error fetching document checklist:', error);
            }
        }
    });
});

// Trigger the initialization
document.addEventListener('DOMContentLoaded', () => {
    Alpine.store('docChecklistData').init();
});
