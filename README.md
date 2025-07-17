# DigiPin Tracker

A modern, responsive Progressive Web Application (PWA) for tracking and displaying location-based digital pins.

![DigiPin Tracker Screenshot](https://via.placeholder.com/800x450.png?text=DigiPin+Tracker+App)

## Overview

DigiPin Tracker is a lightweight PWA that converts geographic coordinates into unique digital pins. It provides a sleek, widget-like interface for real-time location tracking with a focus on usability and visual appeal.

## Features

- **Progressive Web App**: Install on any device for an app-like experience
- **Real-time Location Tracking**: Continuously updates as your location changes
- **Digital Pin Generation**: Converts coordinates to unique, shareable pins
- **Demo Mode**: Test the app without an API key
- **Dark/Light Theme**: Toggle between visual modes for different environments
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Offline Support**: Basic functionality works without an internet connection
- **Copy & Share**: Easily share your DigiPin with others

## Getting Started

### Installation

As a PWA, DigiPin Tracker can be installed directly from your browser:

1. Visit the app URL in a modern browser
2. For mobile devices, tap the "Add to Home Screen" option
3. For desktop, look for the install icon in your browser's address bar

### Usage

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

## Browser Compatibility

DigiPin Tracker works on all modern browsers including:

- Chrome (and Chromium-based browsers)
- Firefox
- Safari
- Edge

## Privacy

DigiPin Tracker only accesses your location when you explicitly start tracking. Your location data is only used to generate DigiPins and is not stored or shared with third parties.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Bootstrap Icons for the icon set
- Google Fonts for the typography