// storage.js - Data persistence and storage management
(function(){
  'use strict';

  // Storage keys
  const KEY = 'bnv_records_v3';
  const THEME_KEY = 'bnv_theme_v3';
  const CAP_KEY = 'bnv_cap_v3';

  // Storage functions
  function load(){
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch(e){
      console.error('load error',e);
      return [];
    }
  }

  function save(records){
    try {
      localStorage.setItem(KEY, JSON.stringify(records));
    } catch(e){
      console.error('save error', e);
    }
  }

  function loadTheme(){
    return localStorage.getItem(THEME_KEY) || 'light';
  }

  function saveTheme(theme){
    localStorage.setItem(THEME_KEY, theme);
  }

  function loadCap(){
    return Number(localStorage.getItem(CAP_KEY) || 0);
  }

  function saveCap(cap){
    localStorage.setItem(CAP_KEY, String(cap));
  }

  // Export functions
  function exportJSON(records){
    const payload = { records, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; 
    a.download = 'bnv-export.json'; 
    document.body.appendChild(a); 
    a.click(); 
    a.remove(); 
    URL.revokeObjectURL(url);
  }

  function importJSON(file, existingRecords, onSuccess, onError){
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target.result);
        const incoming = Array.isArray(parsed.records) ? parsed.records : (Array.isArray(parsed) ? parsed : null);
        if (!incoming) { 
          onError('Invalid file format. Expected { records: [...] } or an array.'); 
          return; 
        }
        
        // Clean and prepare incoming records
        const cleaned = incoming.map(it => ({
          id: it.id ? String(it.id) : Date.now().toString(36) + Math.random().toString(36).slice(2,6),
          type: it.type || 'book',
          title: it.title || 'Untitled',
          author: it.author || '',
          pages: it.pages || null,
          tag: it.tag || '',
          dateAdded: it.dateAdded || new Date().toISOString(),
          isbn: it.isbn || '',
          createdAt: it.createdAt || new Date().toISOString(),
          updatedAt: it.updatedAt || new Date().toISOString()
        }));
        
        // Merge records, avoiding duplicates based on title + author combination
        const existingIds = new Set(existingRecords.map(r => r.id));
        const existingKeys = new Set(existingRecords.map(r => `${r.title.toLowerCase()}|${(r.author || '').toLowerCase()}`));
        
        const newRecords = cleaned.filter(record => {
          // Skip if ID already exists
          if (existingIds.has(record.id)) {
            return false;
          }
          
          // Skip if same title + author combination exists
          const key = `${record.title.toLowerCase()}|${(record.author || '').toLowerCase()}`;
          if (existingKeys.has(key)) {
            return false;
          }
          
          return true;
        });
        
        onSuccess(newRecords, cleaned.length - newRecords.length);
      } catch(err){
        onError('Failed to import: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  // Expose storage functions
  window.Storage = {
    load,
    save,
    loadTheme,
    saveTheme,
    loadCap,
    saveCap,
    exportJSON,
    importJSON
  };

})();
