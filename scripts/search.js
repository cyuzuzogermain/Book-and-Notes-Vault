// search.js - Search functionality and filtering
(function(){
  'use strict';

  // Search functions
  function performSearch(query, records) {
    if (!query.trim()) {
      return records;
    }
    
    let searchResults = [];
    try {
      const re = new RegExp(query, 'i');
      searchResults = records.filter(r => {
        const searchText = [
          r.title || '',
          r.author || '',
          r.tag || '',
          r.isbn || '',
          r.notes || '',
          r.pages ? r.pages.toString() : '',
          r.type || ''
        ].join(' ').toLowerCase();
        return searchText.match(re);
      });
    } catch(e) {
      // invalid regex - fallback to simple string search
      const searchLower = query.toLowerCase();
      searchResults = records.filter(r => {
        const searchText = [
          r.title || '',
          r.author || '',
          r.tag || '',
          r.isbn || '',
          r.notes || '',
          r.pages ? r.pages.toString() : '',
          r.type || ''
        ].join(' ').toLowerCase();
        return searchText.includes(searchLower);
      });
    }
    
    return searchResults;
  }

  function filterRecords(records, filters = {}) {
    let filtered = records;
    
    // Filter by type
    if (filters.type) {
      filtered = filtered.filter(r => r.type === filters.type);
    }
    
    // Filter by tag
    if (filters.tag) {
      filtered = filtered.filter(r => r.tag === filters.tag);
    }
    
    // Filter by search query
    if (filters.query) {
      filtered = performSearch(filters.query, filtered);
    }
    
    return filtered;
  }

  function getUniqueTags(records) {
    const tags = {};
    records.forEach(r => {
      if (r.tag) {
        tags[r.tag] = (tags[r.tag] || 0) + 1;
      }
    });
    return tags;
  }

  // Expose search functions
  window.Search = {
    performSearch,
    filterRecords,
    getUniqueTags
  };

})();
