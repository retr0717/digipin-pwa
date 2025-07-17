// Global variables
let watchId = null;
let isTracking = false;
let isDarkMode = false;

// DOM Elements
const loader = document.getElementById("loader");
const apiKeyContainer = document.querySelector(".api-key-container");
const trackingContainer = document.querySelector(".tracking-container");
const apiKeyInput = document.getElementById("apiKeyInput");
const apiKeyLabel = document.getElementById("apiKeyLabel");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const copyBtn = document.getElementById("copyBtn");
const shareBtn = document.getElementById("shareBtn");
const toastNotification = document.getElementById("toastNotification");
const refreshIndicator = document.getElementById("refreshIndicator");

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  // Initialize waiting indicator
  document.getElementById('waiting-indicator').classList.remove('hidden');
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    enableDarkMode();
  }
  
  // Set current date/time in timestamp field
  updateTimestamp();
});

// Theme toggle functionality
themeToggleBtn.addEventListener("click", () => {
  if (isDarkMode) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

function enableDarkMode() {
  document.body.classList.add('dark-mode');
  themeToggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
  isDarkMode = true;
  localStorage.setItem('theme', 'dark');
}

function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  themeToggleBtn.innerHTML = '<i class="bi bi-moon-stars"></i>';
  isDarkMode = false;
  localStorage.setItem('theme', 'light');
}

// Show/hide loader functions
function showLoader() {
  loader.classList.add("show");
  refreshIndicator.classList.add("active");
}

function hideLoader() {
  loader.classList.remove("show");
  setTimeout(() => {
    refreshIndicator.classList.remove("active");
  }, 500);
}

// Function to update timestamp
function updateTimestamp() {
  const now = new Date();
  const options = { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true
  };
  document.getElementById("timestamp").textContent = now.toLocaleTimeString(undefined, options);
}

// Function to transition from API key input to tracking view
function startTrackingMode() {
  // Hide API key container with animation
  apiKeyContainer.style.opacity = "0";
  apiKeyContainer.style.transform = "translateY(-20px)";
  
  setTimeout(() => {
    apiKeyContainer.style.display = "none";
    
    // Show tracking container with animation
    trackingContainer.style.display = "block";
    setTimeout(() => {
      trackingContainer.style.opacity = "1";
      trackingContainer.style.transform = "translateY(0)";
    }, 50);
  }, 500);
}

// Button ripple effect
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = button.querySelector('.btn-ripple');
  
  if (ripple) {
    ripple.remove();
  }
  
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.classList.add("btn-ripple");
  
  button.appendChild(circle);
  
  setTimeout(() => {
    circle.remove();
  }, 600);
}

// Add ripple effect to buttons
document.querySelectorAll('.primary-btn, .secondary-btn, .outline-btn').forEach(button => {
  button.addEventListener('click', createRipple);
});

// Floating label animation for API key input
function updateFloatingLabel() {
  if (apiKeyInput.value.trim() !== "") {
    apiKeyLabel.classList.add("active");
  } else {
    apiKeyLabel.classList.remove("active");
  }
}

apiKeyInput.addEventListener("focus", updateFloatingLabel);
apiKeyInput.addEventListener("blur", updateFloatingLabel);
apiKeyInput.addEventListener("input", updateFloatingLabel);

// Animation for value changes
function animateValueChange(el) {
  // For DigiPin element, use special highlight animation
  if (el.id === "digipin") {
    el.classList.add("highlight");
    setTimeout(() => {
      el.classList.remove("highlight");
    }, 1000);
    return;
  }
  
  // For other elements (lat/lon)
  el.classList.add("pulse");
  
  setTimeout(() => {
    el.classList.remove("pulse");
  }, 1000);
}

// Start tracking button handler
startBtn.addEventListener("click", () => {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    showToast("Please enter your DigiPin API key", "warning");
    return;
  }

  // Transition from API key input to tracking view
  startTrackingMode();
  
  // Set tracking flag
  isTracking = true;

  // Demo mode if the API key is "demo"
  if (apiKey.toLowerCase() === "demo") {
    startDemoMode();
    return;
  }

  if ("geolocation" in navigator) {
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);

    showLoader();
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;

        // Update accuracy indicator
        updateAccuracyIndicator(accuracy);
        
        // Update coordinates
        updateCoordinates(lat, lon);
        
        // Update timestamp
        updateTimestamp();
        
        // Fetch DigiPin
        fetchDigiPin(lat, lon, apiKey);
      },
      (err) => {
        const digipinEl = document.getElementById("digipin");
        digipinEl.textContent = "Location error";
        showToast("Location error: " + err.message, "error");
        console.error(err);
        hideLoader();
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      }
    );
  } else {
    showToast("Geolocation not supported by this device", "error");
  }
});

// Update accuracy indicator based on accuracy value
function updateAccuracyIndicator(accuracy) {
  const accuracyText = document.getElementById("accuracyText");
  const accuracyIcon = accuracyText.previousElementSibling;
  
  if (accuracy <= 10) {
    accuracyText.textContent = "High accuracy";
    accuracyIcon.className = "bi bi-reception-4";
    accuracyText.style.color = "#4caf50";
  } else if (accuracy <= 50) {
    accuracyText.textContent = "Medium accuracy";
    accuracyIcon.className = "bi bi-reception-3";
    accuracyText.style.color = "#ff9800";
  } else {
    accuracyText.textContent = "Low accuracy";
    accuracyIcon.className = "bi bi-reception-2";
    accuracyText.style.color = "#f44336";
  }
}

// Fetch DigiPin from API
function fetchDigiPin(lat, lon, apiKey) {
  showLoader();
  fetch(`https://api.digipin.dev/generate/digipinFromCoordinates?lat=${lat}&lon=${lon}`, {
    headers: {
      "X-API-Key": apiKey,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const digipinEl = document.getElementById("digipin");
      const errorIndicator = document.getElementById("error-indicator");
      const errorText = document.getElementById("errorText");
      
      if (data.success) {
        // Hide error indicator if it was showing
        errorIndicator.classList.add("hidden");
        
        // Update DigiPin with success data
        digipinEl.textContent = data.data.digipin;
        document.getElementById("validityText").textContent = "5min";
        
        // Animate the DigiPin value
        digipinEl.style.opacity = '1';
        digipinEl.style.transform = 'translateY(0)';
        digipinEl.classList.add("highlight");
        
        setTimeout(() => {
          digipinEl.classList.remove("highlight");
        }, 1200);
      } else {
        // Show API error
        console.error(data);
        errorText.textContent = "API error";
        errorIndicator.classList.remove("hidden");
        showToast("API error: " + (data.message || "Unknown error"), "error");
      }
      hideLoader();
    })
    .catch((err) => {
      console.error(err);
      hideLoader();
      
      // Show error indicator with appropriate message
      const errorIndicator = document.getElementById("error-indicator");
      const errorText = document.getElementById("errorText");
      errorText.textContent = "Connection error";
      errorIndicator.classList.remove("hidden");
      
      // Show toast notification
      showToast("Failed to fetch DigiPin", "error");
    });
}

// Helper function to update coordinates with animation
function updateCoordinates(lat, lon) {
  const latEl = document.getElementById("lat");
  const lonEl = document.getElementById("lon");
  
  latEl.textContent = lat.toFixed(6);
  lonEl.textContent = lon.toFixed(6);
  
  animateValueChange(latEl);
  animateValueChange(lonEl);
}

// Demo mode function with more realistic digipin generation
function startDemoMode() {
  showLoader();
  
  // Mock locations with corresponding DigiPin codes
  const mockLocations = [
    { lat: 37.7749, lon: -122.4194, pin: "SF7X94BD", accuracy: 8 }, // San Francisco
    { lat: 37.7755, lon: -122.4180, pin: "SF7X95AC", accuracy: 12 },
    { lat: 37.7762, lon: -122.4175, pin: "SF7X95BD", accuracy: 5 },
    { lat: 40.7128, lon: -74.0060, pin: "NY6M28FG", accuracy: 15 }, // New York
    { lat: 34.0522, lon: -118.2437, pin: "LA5K72HR", accuracy: 25 }, // Los Angeles
    { lat: 51.5074, lon: -0.1278, pin: "LN9P36JQ", accuracy: 10 }    // London
  ];
  
  // Initial update
  let currentIndex = 0;
  const { lat, lon, pin, accuracy } = mockLocations[currentIndex];
  
  setTimeout(() => {
    updateCoordinates(lat, lon);
    updateAccuracyIndicator(accuracy);
    updateDigiPin(pin);
    updateTimestamp();
    
    // Set up interval for location changes
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % mockLocations.length;
      const location = mockLocations[currentIndex];
      
      updateCoordinates(location.lat, location.lon);
      updateAccuracyIndicator(location.accuracy);
      updateDigiPin(location.pin);
      updateTimestamp();
    }, 5000); // Change location every 5 seconds
    
    // Store interval ID to clear it on reset
    window.demoIntervalId = intervalId;
  }, 1500);
}

// Helper function to update DigiPin with enhanced animation
function updateDigiPin(pin) {
  hideLoader();
  const digipinEl = document.getElementById("digipin");
  const errorIndicator = document.getElementById("error-indicator");
  
  // Hide error indicator if it was showing
  errorIndicator.classList.add("hidden");
  
  // Fade out current value
  digipinEl.style.opacity = '0';
  digipinEl.style.transform = 'translateY(10px)';
  
  // After short delay, update and fade in new value with enhanced animation
  setTimeout(() => {
    digipinEl.textContent = pin;
    digipinEl.classList.add("highlight");
    digipinEl.style.opacity = '1';
    digipinEl.style.transform = 'translateY(0)';
    
    setTimeout(() => {
      digipinEl.classList.remove("highlight");
    }, 1200);
  }, 300);
}

// Reset button handler
resetBtn.addEventListener("click", () => {
  // Stop any active tracking
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  
  // Clear demo mode interval if exists
  if (window.demoIntervalId) {
    clearInterval(window.demoIntervalId);
    window.demoIntervalId = null;
  }
  
  isTracking = false;
  
  // Reset all displayed values
  document.getElementById("lat").textContent = "-";
  document.getElementById("lon").textContent = "-";
  document.getElementById("digipin").textContent = "";
  document.getElementById("timestamp").textContent = "-";
  
  // Show waiting indicator again
  document.getElementById('waiting-indicator').classList.remove('hidden');
  
  // Show API key container and hide tracking container
  trackingContainer.style.opacity = "0";
  trackingContainer.style.transform = "translateY(20px)";
  
  setTimeout(() => {
    trackingContainer.style.display = "none";
    apiKeyContainer.style.display = "block";
    
    setTimeout(() => {
      apiKeyContainer.style.opacity = "1";
      apiKeyContainer.style.transform = "translateY(0)";
    }, 50);
  }, 500);
  
  // Reset API key input
  apiKeyInput.value = "";
  updateFloatingLabel();
});

// Copy button handler
copyBtn.addEventListener("click", () => {
  const digipinText = document.getElementById("digipin").textContent;
  if (digipinText && digipinText !== "API error" && digipinText !== "Fetch error" && digipinText !== "Location error") {
    navigator.clipboard.writeText(digipinText)
      .then(() => {
        showToast("DigiPin copied to clipboard");
      })
      .catch(err => {
        showToast("Failed to copy DigiPin", "error");
        console.error('Could not copy text: ', err);
      });
  }
});

// Share button handler
shareBtn.addEventListener("click", () => {
  const digipinText = document.getElementById("digipin").textContent;
  if (digipinText && digipinText !== "API error" && digipinText !== "Fetch error" && digipinText !== "Location error") {
    if (navigator.share) {
      navigator.share({
        title: 'My DigiPin Location',
        text: `My current location DigiPin: ${digipinText}`,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      showToast("Sharing not supported on this browser", "warning");
    }
  }
});

// Toast notification function
function showToast(message, type = "success") {
  const toastIcon = toastNotification.querySelector(".toast-icon i");
  const toastMessage = toastNotification.querySelector(".toast-message");
  
  // Set icon based on type
  switch(type) {
    case "success":
      toastIcon.className = "bi bi-check-circle-fill";
      toastIcon.style.color = "#4caf50";
      break;
    case "warning":
      toastIcon.className = "bi bi-exclamation-triangle-fill";
      toastIcon.style.color = "#ff9800";
      break;
    case "error":
      toastIcon.className = "bi bi-x-circle-fill";
      toastIcon.style.color = "#f44336";
      break;
  }
  
  // Set message
  toastMessage.textContent = message;
  
  // Show toast
  toastNotification.classList.add("show");
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    toastNotification.classList.remove("show");
  }, 3000);
}

// Close toast button
document.querySelector(".toast-close").addEventListener("click", () => {
  toastNotification.classList.remove("show");
});

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(() => {
    console.log('Service Worker Registered');
  });
}