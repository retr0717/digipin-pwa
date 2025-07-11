let watchId = null;

document.getElementById("startBtn").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKeyInput").value.trim();
  if (!apiKey) {
    alert("Please enter your DigiPin API key.");
    return;
  }

  if ("geolocation" in navigator) {
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);

    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        document.getElementById("lat").textContent = lat.toFixed(6);
        document.getElementById("lon").textContent = lon.toFixed(6);

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
          })
          .catch((err) => {
            document.getElementById("digipin").textContent = "Fetch error";
            console.error(err);
          });
      },
      (err) => {
        document.getElementById("digipin").textContent = "Location error";
        console.error(err);
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

