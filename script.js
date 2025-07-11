let watchId = null;

const loader = document.getElementById("loader");
const output = document.getElementById("output");

function showLoader() {
  loader.style.display = "block";
  output.style.opacity = 0.5;
}
function hideLoader() {
  loader.style.display = "none";
  output.style.opacity = 1;
}

function fadeOutput() {
  output.style.transition = "opacity 0.4s";
  output.style.opacity = 0.3;
  setTimeout(() => {
    output.style.opacity = 1;
  }, 400);
}

document.getElementById("startBtn").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKeyInput").value.trim();
  if (!apiKey) {
    alert("Please enter your DigiPin API key.");
    return;
  }

  if ("geolocation" in navigator) {
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);

    showLoader();
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        document.getElementById("lat").textContent = lat.toFixed(6);
        document.getElementById("lon").textContent = lon.toFixed(6);
        fadeOutput();
        showLoader();
        fetch(`https://api.digipin.dev/generate/digipinFromCoordinates?lat=${lat}&lon=${lon}`, {
          headers: {
            "X-API-Key": apiKey,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              document.getElementById("digipin").textContent = data.data.digipin;
            } else {
              document.getElementById("digipin").textContent = "API error";
              console.error(data);
            }
            hideLoader();
            fadeOutput();
          })
          .catch((err) => {
            document.getElementById("digipin").textContent = "Fetch error";
            console.error(err);
            hideLoader();
            fadeOutput();
          });
      },
      (err) => {
        document.getElementById("digipin").textContent = "Location error";
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

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(() => {
    console.log('Service Worker Registered');
  });
}

