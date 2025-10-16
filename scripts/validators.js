// validators.js - Form validation and regex patterns
(function(){
  'use strict';

  // Regex validators
  const regexTitle = /^\S(?:.*\S)?$/;
  const regexPages = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
  const regexTag = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
  const regexDuplicateWords = /\b(\w+)\s+\1\b/i;

  // Validation functions
  function validateTitle(title) {
    if (!regexTitle.test(title)) {
      return {
        valid: false,
        message: 'Title cannot have leading/trailing spaces.'
      };
    }
    
    if (regexDuplicateWords.test(title)) {
      return {
        valid: false,
        message: 'Title contains duplicate words.'
      };
    }
    
    return { valid: true };
  }

  function validatePages(pages) {
    if (!pages) return { valid: true };
    
    if (!regexPages.test(pages)) {
      return {
        valid: false,
        message: 'Pages must be a non-negative number (max 2 decimals).'
      };
    }
    
    return { valid: true };
  }

  function validateTag(tag) {
    if (!tag) return { valid: true };
    
    if (!regexTag.test(tag)) {
      return {
        valid: false,
        message: 'Tag should use letters, spaces or hyphens only.'
      };
    }
    
    return { valid: true };
  }

  function validateForm(formData) {
    const errors = {};
    
    // Validate title
    const titleValidation = validateTitle(formData.title);
    if (!titleValidation.valid) {
      errors.title = titleValidation.message;
    }
    
    // Validate pages
    const pagesValidation = validatePages(formData.pages);
    if (!pagesValidation.valid) {
      errors.pages = pagesValidation.message;
    }
    
    // Validate tag
    const tagValidation = validateTag(formData.tag);
    if (!tagValidation.valid) {
      errors.tag = tagValidation.message;
    }
    
    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Utility function for escaping HTML
  function escape(s) {
    if (s === null || s === undefined) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Expose validation functions
  window.Validators = {
    validateTitle,
    validatePages,
    validateTag,
    validateForm,
    escape
  };

})();
