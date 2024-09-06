document.addEventListener('alpine:init', () => {
    Alpine.store('contentStore', {
        urlParam: '',
        title: '',
        content: '',
        async init() {
            // Get the last part of the URL path
            const pathSegments = window.location.pathname.split('/');
            this.urlParam = pathSegments[pathSegments.length - 1];
            
            // Fetch the JSON file
            try {
                const response = await fetch(`/public/content/${this.urlParam}.json`);
                if (!response.ok) {
                    throw new Error('Content not found');
                }
                const data = await response.json();
                
                // Set the title and content
                this.title = data.title;
                this.content = data.content;
                
                // Process content after it's loaded
                this.processContent();
            } catch (error) {
                console.error('Error fetching content:', error);
                // Set default title if fetch fails
                this.title = this.urlParam
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase());
            }
        },
        processContent() {
            // Wait for the next DOM update cycle
            setTimeout(() => {
                const container = document.getElementById('dynamic-content');
                if (container) {
                    // Apply Tailwind classes to headings
                    container.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
                        heading.classList.add('font-bold', 'mb-4', 'mt-6');
                        if (heading.tagName === 'H1') heading.classList.add('text-3xl');
                        if (heading.tagName === 'H2') heading.classList.add('text-2xl');
                        if (heading.tagName === 'H3') heading.classList.add('text-xl');
                    });

                    // Apply Tailwind classes to paragraphs
                    container.querySelectorAll('p').forEach(p => {
                        p.classList.add('mb-4', 'text-gray-700');
                    });

                    // Apply Tailwind classes to lists
                    container.querySelectorAll('ul, ol').forEach(list => {
                        list.classList.add('mb-4', 'ml-6');
                        list.querySelectorAll('li').forEach(li => {
                            li.classList.add('mb-2');
                        });
                    });

                    // Apply Tailwind classes to links
                    container.querySelectorAll('a').forEach(a => {
                        a.classList.add('text-blue-600', 'hover:underline');
                    });

                    // Apply Tailwind classes to emphasis and strong
                    container.querySelectorAll('em').forEach(em => {
                        em.classList.add('italic');
                    });
                    container.querySelectorAll('strong').forEach(strong => {
                        strong.classList.add('font-bold');
                    });
                }
            }, 0);
        }
    });
});
