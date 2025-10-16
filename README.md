Link to Video Demonstration: https://youtu.be/9GSyC2K-8rw

# Book & Notes Vault

A modern, responsive web application for managing your personal book collection and reading notes. Built with vanilla JavaScript, this application provides a clean and intuitive interface for cataloging, organizing, and searching through your books.

## Features

### Core Functionality
- **Book Management**: Add, edit, and delete books with comprehensive details
- **Smart Search**: Powerful search functionality across titles, authors, ISBNs, tags, and notes
- **Status Tracking**: Organize books by reading status (To Read, Currently Reading, Read)
- **Rating System**: Rate books with a 5-star system
- **Tagging System**: Add custom tags for better organization
- **Notes**: Add personal notes and thoughts about each book
- **Statistics Dashboard**: View reading statistics and trends

### Advanced Features
- **Data Export/Import**: Export your library to JSON and import from backup files
- **Theme Support**: Light and dark theme options
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Local Storage**: All data is stored locally in your browser
- **Data Validation**: Comprehensive validation for ISBNs, duplicates, and form data
- **Search History**: Track your recent searches
- **Activity Tracking**: View recent book additions and updates

### User Interface
- **Modern Design**: Clean, professional interface with smooth animations
- **Intuitive Navigation**: Easy-to-use navigation with mobile hamburger menu
- **Filter System**: Filter books by reading status
- **Visual Statistics**: Charts and graphs showing reading trends
- **Form Validation**: Real-time validation with helpful error messages

## Project Structure

```
Book Vault/
├── index.html              # Main HTML file
├── styles/
│   └── styles.css          # CSS styles and themes
├── scripts/
│   ├── app.js              # Main application orchestrator
│   ├── state.js            # State management
│   ├── storage.js          # Local storage and file operations
│   ├── ui.js               # UI rendering and event handling
│   ├── search.js           # Search and filter functionality
│   └── validators.js       # Data validation
├── books-data.json         # Sample data structure
├── seed.json              # Seed data for testing
└── README.md              # This file
```

## Technical Architecture

### Modular JavaScript Design
The application follows a modular architecture with separate classes for different concerns:

- **BookVault**: Main application class that orchestrates all components
- **StateManager**: Handles application state and book CRUD operations
- **StorageManager**: Manages localStorage and file import/export
- **UIManager**: Handles UI rendering and user interactions
- **SearchManager**: Provides search and filtering capabilities
- **ValidatorManager**: Validates form data and handles business rules

### Key Technologies
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS custom properties and responsive design
- **Vanilla JavaScript**: ES6+ features with modular class-based architecture
- **Local Storage**: Client-side data persistence
- **File API**: JSON import/export functionality

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or build tools required

### Installation
1. Clone or download the repository
2. Open `index.html` in your web browser
3. Start adding your books!

### First Time Setup
1. Navigate to the "Add Book" section
2. Fill in the required fields (Title, Author, Status)
3. Optionally add ISBN, pages, rating, tags, and notes
4. Click "Save Book" to add it to your library

## Usage Guide

### Adding Books
1. Click "Add Book" in the navigation
2. Fill in the book details:
   - **Title** (required): Book title
   - **Author** (required): Author name
   - **ISBN**: 10 or 13-digit ISBN (optional)
   - **Pages**: Number of pages (optional)
   - **Status** (required): To Read, Currently Reading, or Read
   - **Rating**: 1-5 star rating (optional)
   - **Tags**: Comma-separated tags (optional)
   - **Notes**: Personal notes about the book (optional)
3. Click "Save Book"

### Searching and Filtering
- **Search**: Use the search bar to find books by title, author, ISBN, tags, or notes
- **Filter**: Click filter tabs to view books by status (All, Read, Currently Reading, To Read)
- **Advanced Search**: The search supports partial matches and is case-insensitive

### Managing Your Library
- **Edit Books**: Click the "Edit" button on any book card
- **Delete Books**: Click the "Delete" button (with confirmation)
- **View Statistics**: Check the Dashboard for reading statistics and trends

### Data Management
- **Export Data**: Go to Settings → Export JSON to download your library
- **Import Data**: Use Settings → Import to restore from a JSON file
- **View JSON**: Preview your data in JSON format

## Customization

### Themes
The application supports light and dark themes:
1. Go to Settings
2. Select your preferred theme from the dropdown
3. The theme is automatically saved and applied

### Display Preferences
- **Items per page**: Choose how many books to display (10, 20, or 50)
- **Theme selection**: Switch between light and dark modes

## Data Structure

### Book Object
```javascript
{
  id: "unique_id",
  title: "Book Title",
  author: "Author Name",
  isbn: "1234567890",
  pages: 300,
  status: "read", // "to-read", "reading", "read"
  rating: 5,
  tags: ["fiction", "mystery"],
  notes: "Personal notes about the book",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

### Export Format
```javascript
{
  "books": [...], // Array of book objects
  "metadata": {
    "version": "1.0",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "lastModified": "2024-01-01T00:00:00.000Z",
    "totalBooks": 0
  }
}
```

# Development

### Code Organization
The codebase is organized into modular JavaScript classes:

- **Separation of Concerns**: Each class handles a specific aspect of the application
- **Event-Driven Architecture**: UI events are handled through the UIManager
- **Data Validation**: Comprehensive validation at multiple levels
- **Error Handling**: Graceful error handling with user-friendly messages

### Adding New Features
1. Create new methods in the appropriate manager class
2. Update the main BookVault class to expose new functionality
3. Add UI elements and event listeners in UIManager
4. Update validation rules in ValidatorManager if needed

## Troubleshooting

### Common Issues
- **Data not saving**: Check if localStorage is enabled in your browser
- **Import not working**: Ensure the JSON file follows the correct format
- **Search not working**: Try refreshing the page or clearing search history
- **Theme not applying**: Check browser console for JavaScript errors

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Germain Cyuzuzo**
- GitHub: [@cyuzuzogermain](https://github.com/cyuzuzogermain)
- Email: [c.germain@alustudent.com](mailto:c.germain@alustudent.com)


---
