# DigiPin Tracker

A modern, responsive Progressive Web Application (PWA) for tracking and displaying location-based digital pins, with dedicated widget functionality for multiple platforms.

## Overview

DigiPin Tracker is a lightweight application that converts geographic coordinates into unique digital pins. It provides a sleek interface for real-time location tracking with a focus on usability and visual appeal. The application includes a dedicated widget version that can be embedded across different platforms.

## Deployment to GitHub Pages

To deploy this app to GitHub Pages:

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

## Using DigiPin as a Widget

DigiPin Tracker includes a dedicated widget version (`widget.html`) that can be embedded in various platforms. This widget is designed to be compact and display essential information without requiring the full application.

### Embedding the Widget on Websites

Add the widget to any website or blog using an iframe:

```html
<iframe 
  src="https://YOUR_USERNAME.github.io/digipin-tracker/widget.html" 
  width="300" 
  height="200" 
  frameborder="0"
  title="DigiPin Tracker Widget">
</iframe>
```

You can customize the widget by adding URL parameters:
- `?demo=true` - Use demo mode (default)
- `?apiKey=YOUR_API_KEY` - Use a real API key for live tracking

### Widget for Windows (PC/Laptop)

#### Using Rainmeter

1. **Install Rainmeter** from [rainmeter.net](https://www.rainmeter.net/)
2. **Create a new skin**:
   ```ini
   [Rainmeter]
   Update=1000
   
   [WebParser]
   Measure=WebParser
   URL=https://YOUR_USERNAME.github.io/digipin-tracker/widget.html
   Width=300
   Height=200
   ```
3. **Save** the file with a `.ini` extension in your Rainmeter skins folder
4. **Load the skin** from the Rainmeter manager

#### Using Windows 11 Widgets

1. **Install a third-party widget tool** like "Web Widget for Windows" from the Microsoft Store
2. **Add a new widget** and enter your DigiPin widget URL
3. **Configure size and refresh rate** as needed

### Widget for macOS

1. **Open Dashboard** (if using older macOS) or **Notification Center**
2. **Add a Web Clip widget**:
   - In Safari, navigate to your widget URL
   - Select File > Add to Dashboard/Notification Center
   - Adjust the size of the widget
   - Click Add

### Widget for Android

#### Using KWGT (Kustom Widget Creator)

1. **Install KWGT** from the Google Play Store
2. **Add a KWGT widget** to your home screen
3. **Configure the widget**:
   - Add a "WebView" element
   - Enter your widget URL: `https://YOUR_USERNAME.github.io/digipin-tracker/widget.html`
   - Set refresh rate to 60 seconds or less
   - Adjust size and appearance settings

#### Using Web Widget

1. **Install Web Widget** from the Google Play Store
2. **Add the widget** to your home screen
3. **Configure the widget**:
   - Enter your widget URL
   - Enable JavaScript
   - Set refresh interval to 30-60 seconds
   - Adjust size as needed

### Widget for iOS

iOS has limited support for true widgets, but you can:

1. **Create a Shortcut** in the Shortcuts app
2. **Add a "Show Web Page" action** with your widget URL
3. **Add to Home Screen** or use in the Today View
4. **Use third-party apps** like "Scriptable" for more advanced widget creation

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