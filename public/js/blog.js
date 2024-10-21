document.addEventListener('alpine:init', () => {
  Alpine.store('blogStore', {
    blogDetails: null,
    loading: true,
    error: null,
    
    async fetchBlogDetails(id) {
      this.loading = true;
      this.error = null;
      this.blogDetails = null;
      try {
        const response = await fetch(`https://tourista-monitor.netlify.app/.netlify/functions/api/blog/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched blog data:', data); // Debug log
        
        // Process the content
        const processedContent = this.processContent(data.post);
        //console.log('process ----', processedContent)
        
        this.blogDetails = { id, ...data, content: processedContent };
      } catch (error) {
        console.error('Error fetching blog details:', error);
        this.error = 'Failed to fetch blog details';
      } finally {
        this.loading = false;
        console.log('Store state after fetch:', this); // Debug log
      }
    },

    getBlogDetails() {
      return this.blogDetails;
    },

    processContent(content) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;

      // Add a class to increase font size to the container
      tempDiv.classList.add('text-lg');

      // Apply Tailwind classes to headings
      tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        heading.classList.add('font-bold', 'mb-4', 'mt-6');
        if (heading.tagName === 'H1') heading.classList.add('text-4xl');
        if (heading.tagName === 'H2') heading.classList.add('text-3xl');
        if (heading.tagName === 'H3') heading.classList.add('text-2xl');
      });

      // Apply Tailwind classes to paragraphs
      tempDiv.querySelectorAll('p').forEach(p => {
        p.classList.add('mb-4', 'text-gray-700', 'text-lg');
      });

      // Apply Tailwind classes to lists
      tempDiv.querySelectorAll('ul, ol').forEach(list => {
        list.classList.add('mb-4', 'ml-6');
        list.querySelectorAll('li').forEach(li => {
          li.classList.add('mb-2');
        });
      });

      // Apply Tailwind classes to links
      tempDiv.querySelectorAll('a').forEach(a => {
        a.classList.add('text-blue-600', 'hover:underline');
      });

      // Apply Tailwind classes to emphasis and strong
      tempDiv.querySelectorAll('em').forEach(em => {
        em.classList.add('italic');
      });
      tempDiv.querySelectorAll('strong').forEach(strong => {
        strong.classList.add('font-bold');
      });

      // Apply Tailwind classes to unordered lists
      tempDiv.querySelectorAll('ul').forEach(ul => {
        ul.classList.add('list-disc', 'pl-5', 'space-y-2', 'mb-4');
      });

      // Apply Tailwind classes to list items
      tempDiv.querySelectorAll('li').forEach(li => {
        li.classList.add('text-gray-700', 'text-lg');
      });

      return tempDiv.innerHTML;
    }
  });
});
