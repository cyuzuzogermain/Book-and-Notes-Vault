// state.js - Application state management
(function(){
  'use strict';

  // State variables
  let records = [];
  let editingId = null;

  // State management functions
  function getRecords() {
    return records;
  }

  function setRecords(newRecords) {
    records = newRecords;
  }

  function addRecord(record) {
    records.push(record);
  }

  function updateRecord(id, updatedRecord) {
    records = records.map(r => r.id === id ? { ...r, ...updatedRecord } : r);
  }

  function deleteRecord(id) {
    records = records.filter(r => r.id !== id);
  }

  function getRecordById(id) {
    return records.find(r => r.id === id);
  }

  function getEditingId() {
    return editingId;
  }

  function setEditingId(id) {
    editingId = id;
  }

  function clearEditingId() {
    editingId = null;
  }

  // Record creation helper
  function createRecord(formData) {
    return {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      type: formData.type,
      title: formData.title.trim(),
      author: formData.author.trim(),
      pages: formData.pages ? Number(formData.pages) : null,
      tag: formData.tag.trim(),
      dateAdded: new Date().toISOString(),
      isbn: formData.isbn.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // Record update helper
  function updateRecordFromForm(id, formData) {
    return {
      type: formData.type,
      title: formData.title.trim(),
      author: formData.author.trim(),
      pages: formData.pages ? Number(formData.pages) : null,
      tag: formData.tag.trim(),
      isbn: formData.isbn.trim(),
      updatedAt: new Date().toISOString()
    };
  }

  // Statistics calculations
  function calculateStats() {
    const totalRecords = records.length;
    const totalPages = records.reduce((sum, r) => sum + (Number(r.pages) || 0), 0);
    
    // Top tag calculation
    const tagCounts = {};
    records.forEach(r => {
      if (r.tag) {
        tagCounts[r.tag] = (tagCounts[r.tag] || 0) + 1;
      }
    });
    const topTag = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])[0];
    const topTagCount = topTag ? tagCounts[topTag] : 0;
    
    return {
      totalRecords,
      totalPages,
      topTag,
      topTagCount
    };
  }

  // Trend data calculation (last 7 days)
  function calculateTrend() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      days.push({
        date: d,
        label: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        count: 0
      });
    }
    
    records.forEach(r => {
      if (!r.dateAdded) return;
      const d = new Date(r.dateAdded);
      d.setHours(0, 0, 0, 0);
      const idx = days.findIndex(day => day.date.getTime() === d.getTime());
      if (idx >= 0) days[idx].count++;
    });
    
    return days;
  }

  // Filter records by type
  function getRecordsByType(type) {
    return records.filter(r => r.type === type);
  }

  // Filter records by tag
  function getRecordsByTag(tag) {
    if (!tag) return records;
    return records.filter(r => r.tag === tag);
  }

  // Expose state functions
  window.State = {
    getRecords,
    setRecords,
    addRecord,
    updateRecord,
    deleteRecord,
    getRecordById,
    getEditingId,
    setEditingId,
    clearEditingId,
    createRecord,
    updateRecordFromForm,
    calculateStats,
    calculateTrend,
    getRecordsByType,
    getRecordsByTag
  };

})();
