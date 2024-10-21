document.addEventListener('alpine:init', () => {
  Alpine.store('blogStore', {
    blogs: [],
    loading: true,
    error: null,
    
    async fetchBlogs() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('https://tourista-monitor.netlify.app/.netlify/functions/api/countries-all-visa-info'); // Replace with your actual API endpoint
        const data = await response.json();
        this.blogs = data;
      } catch (error) {
        console.error('Error fetching blogs:', error);
        this.error = 'Failed to fetch blogs';
      } finally {
        this.loading = false;
      }
    },

    getBlogs() {
      return this.blogs;
    }
  });
});