let watchId = null;
let isTracking = false;

const loader = document.getElementById("loader");
const output = document.getElementById("output");
const apiKeyContainer = document.querySelector(".api-key-container");

// Ensure loader is hidden on page load
loader.style.display = "none";

function showLoader() {
  loader.style.display = "block";
  output.style.opacity = 0.5;
}
function hideLoader() {
  loader.style.display = "none";
  output.style.opacity = 1;
}

// Function to hide API key input and show tracking interface
function startTrackingMode() {
  const apiKeyInput = document.getElementById("apiKeyInput");
  const apiKeyContainer = document.querySelector(".api-key-container");
  
  // Animate API key container out
  apiKeyContainer.style.transition = "opacity 0.5s, transform 0.5s";
  apiKeyContainer.style.opacity = "0";
  apiKeyContainer.style.transform = "translateY(-20px)";
  
  setTimeout(() => {
    apiKeyContainer.style.display = "none";
    
    // Show tracking elements with animation
    const trackingContainer = document.querySelector(".tracking-container");
    trackingContainer.style.display = "block";
    setTimeout(() => {
      trackingContainer.style.opacity = "1";
      trackingContainer.style.transform = "translateY(0)";
    }, 50);
  }, 500);
}

function fadeOutput() {
  output.style.transition = "opacity 0.4s";
  output.style.opacity = 0.3;
  setTimeout(() => {
    output.style.opacity = 1;
  }, 400);
}

// Ripple effect for Material FAB
const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", function (e) {
  const btn = this;
  const ripple = btn.querySelector('.ripple');
  if (ripple) {
    ripple.remove();
  }
  const newRipple = document.createElement('span');
  newRipple.className = 'ripple';
  const rect = btn.getBoundingClientRect();
  newRipple.style.width = newRipple.style.height = Math.max(rect.width, rect.height) + 'px';
  newRipple.style.left = (e.clientX - rect.left - rect.width / 2) + 'px';
  newRipple.style.top = (e.clientY - rect.top - rect.height / 2) + 'px';
  btn.appendChild(newRipple);
  setTimeout(() => {
    newRipple.remove();
  }, 600);
});

// Floating label animation for API key input
const apiKeyInput = document.getElementById("apiKeyInput");
const apiKeyLabel = document.getElementById("apiKeyLabel");

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
window.addEventListener("DOMContentLoaded", updateFloatingLabel);

function animateValueChange(el) {
  // For DigiPin element, use special highlight animation
  if (el.id === "digipin") {
    el.classList.add("highlight-animation");
    setTimeout(() => {
      el.classList.remove("highlight-animation");
    }, 800);
    return;
  }
  
  // For other elements (lat/lon)
  el.style.transition = "none";
  el.style.transform = "scale(1.15)";
  el.style.color = "#1565c0";
  el.classList.add("pulse");
  
  setTimeout(() => {
    el.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    el.style.transform = "scale(1)";
    
    // Slightly delayed color return for nicer effect
    setTimeout(() => {
      el.style.color = "";
      el.classList.remove("pulse");
    }, 300);
  }, 400);
}

document.getElementById("startBtn").addEventListener("click", () => {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    alert("Please enter your DigiPin API key.");
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

        const latEl = document.getElementById("lat");
        const lonEl = document.getElementById("lon");
        latEl.textContent = lat.toFixed(6);
        lonEl.textContent = lon.toFixed(6);
        animateValueChange(latEl);
        animateValueChange(lonEl);
        fadeOutput();
        showLoader();
        fetch(`https://api.digipin.dev/generate/digipinFromCoordinates?lat=${lat}&lon=${lon}`, {
          headers: {
            "X-API-Key": apiKey,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const digipinEl = document.getElementById("digipin");
            if (data.success) {
              digipinEl.textContent = data.data.digipin;
            } else {
              digipinEl.textContent = "API error";
              console.error(data);
            }
            animateValueChange(digipinEl);
            hideLoader();
            fadeOutput();
          })
          .catch((err) => {
            const digipinEl = document.getElementById("digipin");
            digipinEl.textContent = "Fetch error";
            animateValueChange(digipinEl);
            console.error(err);
            hideLoader();
            fadeOutput();
          });
      },
      (err) => {
        const digipinEl = document.getElementById("digipin");
        digipinEl.textContent = "Location error";
        animateValueChange(digipinEl);
        console.error(err);
        hideLoader();
        fadeOutput();
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      }
    );
  } else {
    alert("Geolocation not supported by this device.");
  }
});

// Demo mode function
function startDemoMode() {
  showLoader();
  
  // Simulate location updates
  setTimeout(() => {
    updateCoordinates(37.7749, -122.4194); // San Francisco coordinates
    updateDigiPin("SF8429XR");
  }, 1500);
  
  // Simulate a location change after some time
  setTimeout(() => {
    updateCoordinates(37.7755, -122.4180);
    updateDigiPin("SF8429YT");
  }, 6000);
  
  // Another location change
  setTimeout(() => {
    updateCoordinates(37.7762, -122.4175);
    updateDigiPin("SF8430AA");
  }, 10000);
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

// Helper function to update DigiPin with animation
function updateDigiPin(pin) {
  hideLoader();
  const digipinEl = document.getElementById("digipin");
  digipinEl.textContent = pin;
  animateValueChange(digipinEl);
  fadeOutput();
}

// Reset button handler
document.getElementById("resetBtn").addEventListener("click", () => {
  // Stop any active tracking
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  
  isTracking = false;
  
  // Reset all displayed values
  document.getElementById("lat").textContent = "-";
  document.getElementById("lon").textContent = "-";
  document.getElementById("digipin").textContent = "Waiting...";
  
  // Show API key container and hide tracking container
  const apiKeyContainer = document.querySelector(".api-key-container");
  const trackingContainer = document.querySelector(".tracking-container");
  
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
  
  // Reset API key input (optional)
  document.getElementById("apiKeyInput").value = "";
  updateFloatingLabel();
});

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(() => {
    console.log('Service Worker Registered');
  });
}

