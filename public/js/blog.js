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
        const response = await fetch(`http://localhost:8888/.netlify/functions/api/blog/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched blog data:', data); // Debug log
        this.blogDetails = { id, ...data };
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
    }
  });
});