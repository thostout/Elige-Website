// Fetch data from the server
const isLocalhost = window.location.hostname === 'localhost';
const serverUrl = isLocalhost ? 'http://localhost:3000' : 'https://elige-website.onrender.com'

fetch(`${serverUrl}/elige-stats`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse JSON data from response
  })
  .then((data) => {
    // Update the UI with the retrieved stats
    document.getElementById('name').textContent = data.name;
    document.getElementById('totalKills').textContent = data.totalKills;
    document.getElementById('headshotPercentage').textContent = data.headshotPercentage;
    document.getElementById('kd').textContent = data.kd;
    document.getElementById('kpr').textContent = data.kpr;
    document.getElementById('hltvRating').textContent = data.hltvRating;

  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });