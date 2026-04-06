# Project Specification: AI-Powered Website Builder Web Application

## 1. Project Overview
Develop a web-based Website Builder application that allows users to create, customize, and preview websites in real-time. The application must feature an intuitive dashboard interface with smooth drag-and-drop interactions for managing layouts.

## 2. Core Features

### 2.1. Template Selection
- Users must be able to select a starting template based on the website's category.
- **Available Categories:** Corporate / Business, E-commerce, Portfolio, Landing Page.
- The interface should include filtering and sorting options to help users easily find the right template.

### 2.2. Global Color Theme Engine (Color Hunt Integration)
- Implement a global color customization feature.
- **Color Palettes:** Provide pre-defined color palettes inspired by [Color Hunt](https://colorhunt.co/).
- When a user selects a palette, the entire website preview must dynamically update its primary, secondary, background, and accent colors via CSS variables.

### 2.3. Section & Layout Editor
- **Available Layout Sections:** Include ready-to-use modern layouts:
  - **Header / Navigation (Logo & Main Menu)** - Usually fixed at the top.
  - Hero Sections
  - Features Grids
  - Testimonials
  - Pricing Tables
  - **Video Embed Sections** (supporting YouTube link inputs for instant video display).
  - Footer Areas.
- **Adding New Sections:** Users must be able to open a "Section Library" modal or sidebar to browse, select, and insert new sections into the current page layout.
- **Customization Capabilities per Section:**
  - Edit Text (Headings, Paragraphs, Buttons).
  - **Image Management:** Replace images via URL, upload mockups, or **browse and select free high-quality photos directly via the Unsplash API integration**.
  - Override specific colors for that section.

### 2.4. Real-time Live Preview & In-Canvas Interactions
- **Live Preview:** Any change made must reflect instantly on the preview canvas without reloading.
- **In-Canvas Sorting (Drag-and-Drop):** Users can hover over sections directly within the Live Preview to reveal a control toolbar (e.g., Drag handle, Move Up/Down, Delete). Users can use Drag-and-Drop to reorder sections effortlessly right inside the preview screen.
- **Device Viewports:** Provide toggle buttons at the top of the preview canvas to switch between:
  - 📱 Mobile View (approx. 375px width)
  - 💊 Tablet View (approx. 768px width)
  - 💻 Desktop View (100% width)

### 2.5. Web App UI Dark/Light Mode
- The website builder application interface itself must support a theme toggle.
- Users can switch the builder's UI between **Dark Mode** and **Light Mode** for a more comfortable working environment.

---

## 3. Application State & Data Structure (Crucial for AI Context)
To ensure smooth Drag-and-Drop and dynamic rendering, the application must maintain a central state (e.g., using Zustand) based on a structured JSON schema.

**Example Page Schema:**
```json
{
  "theme": {
    "palette": ["#1A1A2E", "#16213E", "#0F3460", "#E94560"],
    "mode": "light"
  },
  "sections": [
    {
      "id": "sec-123",
      "type": "Header",
      "props": {
        "logoUrl": "...",
        "menuItems": ["Home", "About", "Contact"]
      }
    },
    {
      "id": "sec-456",
      "type": "HeroVideo",
      "props": {
        "title": "Welcome to AI Builder",
        "youtubeUrl": "[https://youtube.com/watch?v=](https://youtube.com/watch?v=)..."
      }
    }
  ]
}