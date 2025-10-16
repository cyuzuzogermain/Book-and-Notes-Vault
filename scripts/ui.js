// ui.js - User interface management and rendering
(function(){
  'use strict';

  // DOM element references
  const elements = {
    // Sections
    sections: {
      home: null,
      books: null,
      notes: null,
      add: null,
      about: null,
      settings: null
    },
    
    // Navigation
    nav: {
      dashboard: null,
      home: null,
      books: null,
      notes: null,
      add: null,
      about: null,
      settings: null
    },
    
    // Containers
    recordsContainer: null,
    notesContainer: null,
    
    // Search
    searchInput: null,
    searchBtn: null,
    clearSearchBtn: null,
    filterTag: null,
    
    // Dashboard stats
    statTotal: null,
    statPages: null,
    statTopTag: null,
    statCap: null,
    capMessage: null,
    trendChart: null,
    
    // Form
    form: null,
    fieldType: null,
    fieldTitle: null,
    fieldAuthor: null,
    fieldPages: null,
    fieldTag: null,
    fieldISBN: null,
    saveBtn: null,
    cancelBtn: null,
    
    // Settings
    themeToggle: null,
    capInput: null,
    exportSettings: null,
    importSettings: null,
    importFile: null,
    deleteAll: null,
    
    // Other
    floatingAdd: null,
    yearEl: null
  };

  // Initialize DOM elements
  function initializeElements() {
    // Sections
    elements.sections.home = document.querySelector('#homeSection');
    elements.sections.books = document.querySelector('#booksSection');
    elements.sections.notes = document.querySelector('#notesSection');
    elements.sections.add = document.querySelector('#addSection');
    elements.sections.about = document.querySelector('#aboutSection');
    elements.sections.settings = document.querySelector('#settingsSection');

    // Navigation
    elements.nav.dashboard = document.querySelector('#navDashboard');
    elements.nav.home = document.querySelector('#navDashboard'); // dashboard and home point to the same element
    elements.nav.books = document.querySelector('#navBooks');
    elements.nav.notes = document.querySelector('#navNotes');
    elements.nav.add = document.querySelector('#navAdd');
    elements.nav.about = document.querySelector('#navAbout');
    elements.nav.settings = document.querySelector('#navSettings');

    // Containers
    elements.recordsContainer = document.querySelector('#recordsContainer');
    elements.notesContainer = document.querySelector('#notesContainer');

    // Search
    elements.searchInput = document.querySelector('#searchInput');
    elements.searchBtn = document.querySelector('#searchBtn');
    elements.clearSearchBtn = document.querySelector('#clearSearchBtn');
    elements.filterTag = document.querySelector('#filterTag');

    // Dashboard stats
    elements.statTotal = document.querySelector('#statTotal');
    elements.statPages = document.querySelector('#statPages');
    elements.statTopTag = document.querySelector('#statTopTag');
    elements.statCap = document.querySelector('#statCap');
    elements.capMessage = document.querySelector('#capMessage');
    elements.trendChart = document.querySelector('#trendChart');

    // Form
    elements.form = document.querySelector('#recordForm');
    elements.fieldType = document.querySelector('#fieldType');
    elements.fieldTitle = document.querySelector('#fieldTitle');
    elements.fieldAuthor = document.querySelector('#fieldAuthor');
    elements.fieldPages = document.querySelector('#fieldPages');
    elements.fieldTag = document.querySelector('#fieldTag');
    elements.fieldISBN = document.querySelector('#fieldISBN');
    elements.saveBtn = document.querySelector('#saveRecord');
    elements.cancelBtn = document.querySelector('#cancelRecord');

    // Settings
    elements.themeToggle = document.querySelector('#themeToggle');
    elements.capInput = document.querySelector('#capInput');
    elements.exportSettings = document.querySelector('#exportSettings');
    elements.importSettings = document.querySelector('#importSettings');
    elements.importFile = document.querySelector('#importFile');
    elements.deleteAll = document.querySelector('#deleteAll');

    // Other
    elements.floatingAdd = document.querySelector('#floatingAdd');
    elements.yearEl = document.querySelector('#yearEl');
  }

  // Navigation functions
  function show(section) {
    Object.values(elements.sections).forEach(s => s.classList.add('hidden'));
    elements.sections[section].classList.remove('hidden');
    elements.sections[section].focus();
    
    // Update nav active state
    Object.values(elements.nav).forEach(b => b.classList.remove('active'));
    elements.nav[section].classList.add('active');
  }

  // Rendering functions
  function renderRecords(records, filters = {}) {
    if (!elements.recordsContainer) return;
    
    elements.recordsContainer.innerHTML = '';
    const frag = document.createDocumentFragment();
    
    let filtered = records.filter(r => r.type === 'book');
    
    // Apply filters
    if (filters.tag) {
      filtered = filtered.filter(r => r.tag === filters.tag);
    }
    
    if (filters.query) {
      filtered = window.Search.performSearch(filters.query, filtered);
    }
    
    if (filtered.length === 0) {
      const e = document.createElement('div');
      e.className = 'no-books';
      e.textContent = 'No books found.';
      frag.appendChild(e);
    } else {
      filtered.forEach(r => {
        const card = document.createElement('article');
        card.className = 'card book-card';
        card.innerHTML = `
          <h3>${window.Validators.escape(r.title)}</h3>
          <div class="meta">by ${window.Validators.escape(r.author || '—')} • ${window.Validators.escape(r.dateAdded ? r.dateAdded.slice(0, 10) : '—')}</div>
          <div class="meta">Pages: ${window.Validators.escape(r.pages || '—')} • Tag: ${window.Validators.escape(r.tag || '—')}</div>
          <div class="card-actions">
            <button class="btn" data-id="${r.id}" data-action="edit">Edit</button>
            <button class="btn btn-danger" data-id="${r.id}" data-action="delete">Delete</button>
          </div>
        `;
        frag.appendChild(card);
      });
    }
    
    elements.recordsContainer.appendChild(frag);
    populateTagFilter(records);
  }

  function renderNotes(records) {
    if (!elements.notesContainer) return;
    
    elements.notesContainer.innerHTML = '';
    const notes = records.filter(r => r.type === 'note');
    const frag = document.createDocumentFragment();
    
    if (notes.length === 0) {
      const e = document.createElement('div');
      e.className = 'no-books';
      e.textContent = 'No notes yet.';
      frag.appendChild(e);
    } else {
      notes.forEach(r => {
        const card = document.createElement('article');
        card.className = 'card note-card';
        card.innerHTML = `
          <h3>${window.Validators.escape(r.title)}</h3>
          <div class="meta">${window.Validators.escape(r.tag || '—')} • ${window.Validators.escape(r.dateAdded ? r.dateAdded.slice(0, 10) : '—')}</div>
          <div class="card-actions">
            <button class="btn" data-id="${r.id}" data-action="edit">Edit</button>
            <button class="btn btn-danger" data-id="${r.id}" data-action="delete">Delete</button>
          </div>
          <div class="note-body">${window.Validators.escape(r.notes || '')}</div>
        `;
        frag.appendChild(card);
      });
    }
    
    elements.notesContainer.appendChild(frag);
  }

  function displaySearchResults(results) {
    if (!elements.recordsContainer) return;
    
    elements.recordsContainer.innerHTML = '';
    const frag = document.createDocumentFragment();
    
    if (results.length === 0) {
      const e = document.createElement('div');
      e.className = 'no-books';
      e.textContent = 'No matching records found.';
      frag.appendChild(e);
    } else {
      // Group results by type
      const books = results.filter(r => r.type === 'book');
      const notes = results.filter(r => r.type === 'note');
      
      if (books.length > 0) {
        const booksHeader = document.createElement('h3');
        booksHeader.textContent = `Books (${books.length})`;
        booksHeader.className = 'search-section-header';
        frag.appendChild(booksHeader);
        
        books.forEach(r => {
          const card = document.createElement('article');
          card.className = 'card book-card';
          card.innerHTML = `
            <h3>${window.Validators.escape(r.title)}</h3>
            <div class="meta">by ${window.Validators.escape(r.author || '—')} • ${window.Validators.escape(r.dateAdded ? r.dateAdded.slice(0, 10) : '—')}</div>
            <div class="meta">Pages: ${window.Validators.escape(r.pages || '—')} • Tag: ${window.Validators.escape(r.tag || '—')}</div>
            <div class="card-actions">
              <button class="btn" data-id="${r.id}" data-action="edit">Edit</button>
              <button class="btn btn-danger" data-id="${r.id}" data-action="delete">Delete</button>
            </div>
          `;
          frag.appendChild(card);
        });
      }
      
      if (notes.length > 0) {
        const notesHeader = document.createElement('h3');
        notesHeader.textContent = `Notes (${notes.length})`;
        notesHeader.className = 'search-section-header';
        frag.appendChild(notesHeader);
        
        notes.forEach(r => {
          const card = document.createElement('article');
          card.className = 'card note-card';
          card.innerHTML = `
            <h3>${window.Validators.escape(r.title)}</h3>
            <div class="meta">${window.Validators.escape(r.tag || '—')} • ${window.Validators.escape(r.dateAdded ? r.dateAdded.slice(0, 10) : '—')}</div>
            <div class="card-actions">
              <button class="btn" data-id="${r.id}" data-action="edit">Edit</button>
              <button class="btn btn-danger" data-id="${r.id}" data-action="delete">Delete</button>
            </div>
            <div class="note-body">${window.Validators.escape(r.notes || '')}</div>
          `;
          frag.appendChild(card);
        });
      }
    }
    
    elements.recordsContainer.appendChild(frag);
  }

  function populateTagFilter(records) {
    if (!elements.filterTag) return;
    
    const tags = window.Search.getUniqueTags(records);
    elements.filterTag.innerHTML = '<option value="">All tags</option>';
    Object.keys(tags).sort().forEach(t => {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = `${t} (${tags[t]})`;
      elements.filterTag.appendChild(opt);
    });
  }

  function updateDashboard(records) {
    const stats = window.State.calculateStats();
    
    if (elements.statTotal) elements.statTotal.textContent = stats.totalRecords;
    if (elements.statPages) elements.statPages.textContent = stats.totalPages;
    if (elements.statTopTag) {
      elements.statTopTag.textContent = stats.topTag ? `${stats.topTag} (${stats.topTagCount})` : '—';
    }
    
    // Cap calculation
    const cap = window.Storage.loadCap();
    if (elements.statCap && elements.capMessage) {
      if (cap > 0) {
        const remaining = cap - stats.totalPages;
        elements.statCap.textContent = `${remaining} pages remaining`;
        
        // ARIA live: polite if under, assertive if exceeded
        if (remaining < 0) {
          elements.capMessage.setAttribute('role', 'alert');
          elements.capMessage.textContent = `Cap exceeded by ${Math.abs(remaining)} pages!`;
        } else {
          elements.capMessage.setAttribute('role', 'status');
          elements.capMessage.textContent = `${remaining} pages remaining until cap (${cap}).`;
        }
      } else {
        elements.statCap.textContent = 'No cap set';
        elements.capMessage.textContent = '';
      }
    }
    
    renderTrend(records);
  }

  function renderTrend(records) {
    if (!elements.trendChart) return;
    
    const days = window.State.calculateTrend();
    elements.trendChart.innerHTML = '';
    
    const max = Math.max(...days.map(d => d.count), 1);
    days.forEach(d => {
      const bar = document.createElement('div');
      bar.className = 'trend-bar';
      bar.style.height = `${(d.count / max) * 100}%`;
      bar.title = `${d.label}: ${d.count}`;
      bar.innerHTML = `<span class="bar-label">${d.label}</span><span class="bar-value">${d.count > 0 ? d.count : ''}</span>`;
      elements.trendChart.appendChild(bar);
    });
  }

  function openForm(editId) {
    window.State.setEditingId(editId || null);
    elements.form.reset();
    show('add');
    elements.fieldTitle.focus();
    
    if (editId) {
      const rec = window.State.getRecordById(editId);
      if (!rec) return;
      
      elements.fieldType.value = rec.type || 'book';
      elements.fieldTitle.value = rec.title || '';
      elements.fieldAuthor.value = rec.author || '';
      elements.fieldPages.value = rec.pages || '';
      elements.fieldTag.value = rec.tag || '';
      elements.fieldISBN.value = rec.isbn || '';
    }
  }

  function showValidationError(field, message) {
    const helpElement = document.querySelector(`#${field}Help`);
    if (helpElement) {
      helpElement.textContent = message;
    }
  }

  function clearValidationErrors() {
    const helpElements = document.querySelectorAll('[id$="Help"]');
    helpElements.forEach(el => el.textContent = '');
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    window.Storage.saveTheme(theme);
  }

  function toggleTheme() {
    const current = window.Storage.loadTheme();
    const newTheme = current === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  // Event handlers
  function setupEventListeners() {
    // Navigation
    if (elements.nav.dashboard) {
      elements.nav.dashboard.addEventListener('click', () => {
        show('home');
        updateAll();
      });
    }
    
    if (elements.nav.books) {
      elements.nav.books.addEventListener('click', () => {
        show('books');
        renderRecords(window.State.getRecords());
      });
    }
    
    if (elements.nav.notes) {
      elements.nav.notes.addEventListener('click', () => {
        show('notes');
        renderNotes(window.State.getRecords());
      });
    }
    
    if (elements.nav.add) {
      elements.nav.add.addEventListener('click', () => openForm());
    }
    
    if (elements.nav.about) {
      elements.nav.about.addEventListener('click', () => show('about'));
    }
    
    if (elements.nav.settings) {
      elements.nav.settings.addEventListener('click', () => show('settings'));
    }

    // Floating add button
    if (elements.floatingAdd) {
      elements.floatingAdd.addEventListener('click', openForm);
    }

    // Search functionality
    if (elements.searchBtn) {
      elements.searchBtn.addEventListener('click', () => {
        const query = elements.searchInput.value.trim();
        if (!query) {
          renderRecords(window.State.getRecords());
          return;
        }
        const results = window.Search.performSearch(query, window.State.getRecords());
        displaySearchResults(results);
      });
    }
    
    if (elements.searchInput) {
      elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const query = elements.searchInput.value.trim();
          if (!query) {
            renderRecords(window.State.getRecords());
            return;
          }
          const results = window.Search.performSearch(query, window.State.getRecords());
          displaySearchResults(results);
        }
      });
    }
    
    if (elements.clearSearchBtn) {
      elements.clearSearchBtn.addEventListener('click', () => {
        elements.searchInput.value = '';
        renderRecords(window.State.getRecords());
      });
    }

    // Tag filter
    if (elements.filterTag) {
      elements.filterTag.addEventListener('change', () => {
        renderRecords(window.State.getRecords(), { tag: elements.filterTag.value });
      });
    }

    // Form handling
    if (elements.cancelBtn) {
      elements.cancelBtn.addEventListener('click', () => {
        elements.form.reset();
        window.State.clearEditingId();
        show('home');
      });
    }

    if (elements.form) {
      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
          type: elements.fieldType.value,
          title: elements.fieldTitle.value,
          author: elements.fieldAuthor.value,
          pages: elements.fieldPages.value,
          tag: elements.fieldTag.value,
          isbn: elements.fieldISBN.value
        };

        const validation = window.Validators.validateForm(formData);
        
        if (!validation.valid) {
          // Show validation errors
          Object.keys(validation.errors).forEach(field => {
            showValidationError(field, validation.errors[field]);
          });
          return;
        }

        clearValidationErrors();

        // Create or update record
        if (window.State.getEditingId()) {
          const updatedRecord = window.State.updateRecordFromForm(window.State.getEditingId(), formData);
          window.State.updateRecord(window.State.getEditingId(), updatedRecord);
          window.State.clearEditingId();
        } else {
          const newRecord = window.State.createRecord(formData);
          window.State.addRecord(newRecord);
        }

        window.Storage.save(window.State.getRecords());
        elements.form.reset();
        show('home');
        updateAll();
      });
    }

    // Settings
    if (elements.exportSettings) {
      elements.exportSettings.addEventListener('click', () => {
        window.Storage.exportJSON(window.State.getRecords());
      });
    }

    if (elements.importSettings) {
      elements.importSettings.addEventListener('click', () => {
        elements.importFile.click();
      });
    }

    if (elements.importFile) {
      elements.importFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        window.Storage.importJSON(
          file,
          window.State.getRecords(),
          (newRecords, skipped) => {
            if (!confirm(`Import ${newRecords.length + skipped} records? This will merge with existing data, skipping duplicates.`)) return;
            
            newRecords.forEach(record => window.State.addRecord(record));
            window.Storage.save(window.State.getRecords());
            updateAll();
            
            let message = `Import complete! Added ${newRecords.length} new records.`;
            if (skipped > 0) {
              message += ` Skipped ${skipped} duplicate records.`;
            }
            alert(message);
          },
          (error) => {
            alert(error);
          }
        );
        elements.importFile.value = '';
      });
    }

    if (elements.deleteAll) {
      elements.deleteAll.addEventListener('click', () => {
        if (!confirm('Delete ALL records? This cannot be undone.')) return;
        window.State.setRecords([]);
        window.Storage.save(window.State.getRecords());
        updateAll();
      });
    }

    if (elements.capInput) {
      elements.capInput.addEventListener('change', () => {
        const val = Number(elements.capInput.value) || 0;
        window.Storage.saveCap(val);
        updateDashboard(window.State.getRecords());
      });
    }

    if (elements.themeToggle) {
      elements.themeToggle.addEventListener('click', toggleTheme);
    }

    // Button handlers
    document.body.addEventListener('click', (e) => {
      const button = e.target.closest('button[data-action]');
      if (!button) return;
      
      const action = button.dataset.action;
      const id = button.dataset.id;
      
      if (action === 'edit') {
        openForm(id);
      } else if (action === 'delete') {
        if (confirm('Are you sure you want to delete this record?')) {
          window.State.deleteRecord(id);
          window.Storage.save(window.State.getRecords());
          updateAll();
        }
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        openForm();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggleTheme();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        window.Storage.save(window.State.getRecords());
        alert('Saved');
      }
    });

    // Accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') document.documentElement.classList.add('show-focus');
    });
    document.addEventListener('mousedown', () => {
      document.documentElement.classList.remove('show-focus');
    });
  }

  function updateAll() {
    const records = window.State.getRecords();
    renderRecords(records);
    renderNotes(records);
    updateDashboard(records);
  }

  function initialize() {
    initializeElements();
    setupEventListeners();
    
    // Initialize theme
    applyTheme(window.Storage.loadTheme());
    
    // Initialize year
    if (elements.yearEl) {
      elements.yearEl.textContent = new Date().getFullYear();
    }
    
    // Initialize cap input
    if (elements.capInput) {
      elements.capInput.value = window.Storage.loadCap();
    }
    
    // Initial render
    updateAll();
  }

  // Expose UI functions
  window.UI = {
    show,
    renderRecords,
    renderNotes,
    displaySearchResults,
    updateDashboard,
    openForm,
    applyTheme,
    toggleTheme,
    updateAll,
    initialize,
    elements
  };

})();
