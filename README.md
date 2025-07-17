# DigiPin Tracker

A modern, responsive Progressive Web Application (PWA) for tracking and displaying location-based digital pins, designed to work as a widget on Android devices.

## Overview

DigiPin Tracker is a lightweight PWA that converts geographic coordinates into unique digital pins. It provides a sleek, widget-like interface for real-time location tracking with a focus on usability and visual appeal.

## Deployment to GitHub Pages

To deploy this app to GitHub Pages and use it as a widget on your Android phone:

1. **Create a GitHub repository**:
   - Create a new repository on GitHub
   - Push this code to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/digipin-tracker.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Select the branch you want to deploy (usually `main`)
   - Click Save
   - Your site will be published at `https://YOUR_USERNAME.github.io/digipin-tracker/`

3. **Verify deployment**:
   - Wait a few minutes for the deployment to complete
   - Visit your GitHub Pages URL to ensure the app is working correctly

## Adding to Android Home Screen as a Widget

1. **Open Chrome** on your Android device
2. **Visit your GitHub Pages URL**: `https://YOUR_USERNAME.github.io/digipin-tracker/`
3. **Install as PWA**:
   - Tap the menu button (three dots) in Chrome
   - Select "Add to Home screen" or "Install app"
   - Follow the prompts to add the app to your home screen

4. **Use as a Widget** (Android 12+):
   - Long press on an empty area of your home screen
   - Select "Widgets"
   - Find "Chrome" or "Web App" widgets
   - Look for DigiPin Tracker or select a Chrome shortcut widget
   - Place it on your home screen
   - Select the DigiPin Tracker PWA when prompted

5. **Alternative Widget Method**:
   - Install a third-party app like "KWGT" or "Web Widget"
   - Create a custom widget that loads your DigiPin Tracker URL
   - Configure the widget size to match the app's compact design

## Features

- **Widget-Optimized Design**: Compact interface perfect for home screen widgets
- **Progressive Web App**: Install on any device for an app-like experience
- **Real-time Location Tracking**: Continuously updates as your location changes
- **Digital Pin Generation**: Converts coordinates to unique, shareable pins
- **Demo Mode**: Test the app without an API key
- **Dark/Light Theme**: Toggle between visual modes for different environments
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Offline Support**: Basic functionality works without an internet connection
- **Copy & Share**: Easily share your DigiPin with others

## Usage

1. Enter your DigiPin API key or use "demo" for test data
2. Click "Track" to start location tracking
3. The app will display your current coordinates and DigiPin
4. Use the copy button to copy your DigiPin to the clipboard
5. Use the share button to share your DigiPin through other apps

## Demo Mode

To try the app without an API key, simply enter "demo" in the API key field. This will simulate location changes and DigiPin generation.

## Technical Details

### Technologies Used

- **HTML5**: Semantic markup and modern web features
- **CSS3**: Custom properties, flexbox, grid, and animations
- **JavaScript**: ES6+ features for interactive functionality
- **Service Workers**: For offline capabilities and PWA features
- **Geolocation API**: For accessing device location
- **Web Share API**: For native sharing functionality
- **Bootstrap Icons**: For visual elements and iconography

### API Integration

The app integrates with the DigiPin API to convert geographic coordinates into unique digital pins. To use your own API key:

1. Register at the DigiPin API service
2. Obtain your API key
3. Enter the key in the app's input field

## Troubleshooting Widget Issues

- **Widget not updating**: Make sure battery optimization is disabled for Chrome/browser
- **Location not working**: Check that location permissions are granted for the website
- **Widget too small**: Some Android launchers allow resizing widgets after placement
- **PWA not installing**: Make sure you're using a modern version of Chrome

## Privacy

DigiPin Tracker only accesses your location when you explicitly start tracking. Your location data is only used to generate DigiPins and is not stored or shared with third parties.

## License

This project is licensed under the MIT License - see the LICENSE file for details.