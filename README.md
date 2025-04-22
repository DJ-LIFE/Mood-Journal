# Interactive Mood Journal with Weather Integration

This project is a personal mood journal web application that integrates real-time weather data. It is developed as part of the **APIWIZ - Frontend Intern/Fresher Role Assignment**. The application focuses on building responsive, user-focused interfaces while utilizing public APIs and geolocation features.

## Objective

The goal of this project is to create a responsive, interactive web app that allows users to log their mood each day and visualize it alongside real-time weather data.

## Features

1. **User Interface**:
   - Clean and responsive layout compatible with mobile and desktop screens.
   - Daily mood selection system with at least 5 different mood options (represented by emojis or custom icons).
   - Short text input field for daily notes.
   - Prominent display of the current date.
   - Real-time weather display for the user's location.
   - Calendar view for past mood entries.

2. **Core Features**:
   - Mood selection with visual feedback.
   - Auto-population of the current date.
   - Geolocation API integration to fetch the user’s current location.
   - Weather data fetched using a free API (e.g., OpenWeatherMap).
   - Mood entries linked with weather data and stored together.

3. **Visual Enhancements**:
   - Custom or emoji mood icons.
   - Visual representation of weather (e.g., sun icon for clear, cloud for overcast).

4. **User Experience Features**:
   - Form validation for mood selection and note input.
   - Confirmation prompt/notification after saving an entry.
   - Calendar view showing all previous entries with mood and weather snapshots.

5. **Technical Features**:
   - Built using React and TypeScript with Vite.
   - Clean and modular code structure.
   - Local storage for storing entries.
   - Integration with a free weather API using asynchronous calls (axios).

## What We Have Done

1. **Set Up the Project**:
   - Initialized the project with Vite and configured it for React and TypeScript.
   - Installed necessary dependencies for development and production.

2. **Implemented Functional Requirements**:
   - Developed a responsive layout for mobile and desktop screens.
   - Added a mood selection system with 5 custom emoji options.
   - Integrated a text input field for daily notes.
   - Displayed the current date prominently.
   - Used the Geolocation API to fetch the user's location.
   - Integrated OpenWeatherMap API to fetch real-time weather data.
   - Linked mood entries with weather data and stored them in local storage.

3. **Enhanced Visuals**:
   - Designed custom emoji icons for moods.
   - Displayed weather icons dynamically based on weather conditions.

4. **Improved User Experience**:
   - Added form validation for mood selection and note input.
   - Implemented a confirmation notification after saving entries.
   - Created a calendar view to display past entries with mood and weather snapshots.

## How to Run the Project

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build the project for production:
   ```bash
   npm run build
   ```

4. Preview the production build:
   ```bash
   npm run preview
   ```

## Bonus Features (Implemented)
- **Export Entries**: Enabled exporting journal entries as a CSV file.

## Future Improvements

- Add integration with a backend for persistent data storage.
- Implement user authentication for personalized journal entries.
- Optimize the application for performance and scalability.

## Conclusion

This project demonstrates a well-configured React + TypeScript setup with Vite, focusing on responsive design, API integration, and enhanced user experience. It serves as a strong foundation for building scalable and maintainable web applications.
