document.addEventListener('alpine:init', () => {
    Alpine.store('faqData', {
        questions: [],
        async init() {
            try {
                const response = await fetch('/public/faq.json');
                const data = await response.json();
                this.questions = data.questions;
            } catch (error) {
                console.error('Error fetching FAQ questions:', error);
            }
        }
    });
});

// Trigger the initialization
document.addEventListener('DOMContentLoaded', () => {
    Alpine.store('faqData').init();
});
