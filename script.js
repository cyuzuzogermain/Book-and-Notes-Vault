// Book & Notes Vault v3 - Main Application
(function(){
  'use strict';

  // Initialize the application
  function initialize() {
    // Load initial data
    const records = window.Storage.load();
    window.State.setRecords(records);
    
    // Initialize UI
    window.UI.initialize();
    
    // Expose for debugging
    window.BNV = {
      records: window.State.getRecords,
      save: () => window.Storage.save(window.State.getRecords()),
      load: () => window.Storage.load()
    };
  }

  // Start the application when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})();