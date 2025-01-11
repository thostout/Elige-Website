// Import required libraries
const express = require('express'); // Web server framework
const cors = require('cors');
const { HLTV } = require('hltv'); 


// Initialize Express application
const app = express();
const PORT = 3000; // Port for the server
app.use(cors({origin:'https://eligecs2stats.netlify.app'})); // Enable Cross-Origin Resource Sharing (CORS)

let eligeStatsResponse = null
let lastStatsUpdate = null

// Define an endpoint to fetch EliGE's stats
app.get('/elige-stats', (req, res) => {
  if (eligeStatsResponse && lastStatsUpdate > Date.now() - 300000) {
    console.log('Returning cached stats')
    return res.json(eligeStatsResponse)
  }
  // Use HLTV API to fetch stats by player ID
  HLTV.getPlayerStats({ id: 8738 }) // 8738 is EliGE's player ID on HLTV
    .then((player) => {
      // Respond with JSON containing key stats
      eligeStatsResponse = {
        name: player.name,
        totalKills: player.overviewStatistics.kills,
        headshotPercentage: player.overviewStatistics.headshots,
        kd: player.overviewStatistics.kdRatio,
        kpr: player.overviewStatistics.killsPerRound,
        hltvRating: player.overviewStatistics.rating1,
      };
      lastStatsUpdate = Date.now()
      res.json({
        name: player.name,
        totalKills: player.overviewStatistics.kills,
        headshotPercentage: player.overviewStatistics.headshots,
        kd: player.overviewStatistics.kdRatio,
        kpr: player.overviewStatistics.killsPerRound,
        hltvRating: player.overviewStatistics.rating1,
      });
    })
    .catch((error) => {
      console.error('Error fetching stats:', error);
      res.status(500).json({ error: 'Failed to fetch stats' });
    });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
