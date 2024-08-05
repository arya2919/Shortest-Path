// Define the metro stations and their connections (graph)
const metroStations = {
  "Anand Nagar": {
    "Ideal Colony": 5,
    "Garware College": 15,
    
  },
  "Ideal Colony": {
    "Anand Nagar": 5,
    "Garware College": 10,
    "Chhatrapati Sambhaji Udyan": 15,
  },
  "Garware College": {
    "Anand Nagar": 15,
    "Ideal Colony": 10,
    "Chhatrapati Sambhaji Udyan": 5,
    "PMC Bhavan": 10,
  },
  "Chhatrapati Sambhaji Udyan": {
    "Ideal Colony": 15,
    "Garware College": 5,
    "PMC Bhavan": 10,
    " District Court Pune": 10,
  },
  "PMC Bhavan": {
    "Garware College": 10,
    "Chhatrapati Sambhaji Udyan": 10,
    "District Court Pune": 5,
  },
  "District Court Pune": {
    "Chhatrapati Sambhaji Udyan": 10,
    "PMC Bhavan": 5,
    "Pune Railway Station": 5,
    "Shivaji Nagar": 10,
  },
  "Shivaji Nagar": {
    "District Court Pune": 10,
    "Bapodi": 25,
  },
  "Bapodi": {
    "Shivaji Nagar": 25,
    "Dapodi": 5,
  },
  "Dapodi": {
    "Bapodi": 5,
    "Phugewadi": 5,
  },
  "Phugewadi": {
    "Dapodi": 5,
    "Kasarwadi": 10,
  },
  "Kasarwadi": {
    "Phugewadi": 10,
    "Sant Tukaram Nagar": 15,
    "PCMC":20,
  },
  "Sant Tukaram Nagar": {
    "Kasarwadi": 15,
    "PCMC": 5,
  },
  "PCMC": {
    "Sant Tukaram Nagar": 5,
  },
  "Pune Railway Station": {
    "District Court Pune": 5,
    "Ruby Clinic": 5,
  },
  "Ruby Clinic": {
    "Pune Railway Station": 5,
    "Bund Garden": 5,
  },
  "Bund Garden": {
    "Ruby Clinic": 5,
    "Ramvadi": 15,
  },
  "Ramvadi": {
    "Bund Garden": 15,
  },
 
};

// Function to calculate the shortest route and fare

function calculate(){
    // Function to calculate the shortest route and fare
    const sourceStation = document.getElementById('source').value;
    const destinationStation = document.getElementById('destination').value;

     // Check if source and destination are selected
  if (sourceStation === '' || destinationStation === '') {
    alert('Please select source and destination stations.');
    return;
  }
   // Dijkstra's algorithm implementation to find the shortest route and fare
   const stations = Object.keys(metroStations);
   const INF = Number.MAX_SAFE_INTEGER;
 
   // Create a distance matrix and initialize with Infinity
   const distances = {};
   stations.forEach((station) => (distances[station] = INF));
   distances[sourceStation] = 0;
 
   const visited = {};
   const path = {};
 
   while (true) {
     let currentStation = null;
 
     // Find the nearest station
     stations.forEach((station) => {
       if (
         !visited[station] &&
         (currentStation === null ||
           distances[station] < distances[currentStation])
       ) {
         currentStation = station;
       }
     });
 
     if (currentStation === null || distances[currentStation] === INF) {
       break;
     }
 
     visited[currentStation] = true;
 
     // Update distances to adjacent stations
     for (const neighbor in metroStations[currentStation]) {
       const distance =
         distances[currentStation] + metroStations[currentStation][neighbor];
       if (distance < distances[neighbor]) {
         distances[neighbor] = distance;
         path[neighbor] = currentStation;
       }
     }
   }
 
   // Build the route and calculate the fare
   const route = [];
   let current = destinationStation;
   while (current !== sourceStation) {
     route.unshift(current);
     current = path[current];
   }
   route.unshift(sourceStation);
 
   const fare = distances[destinationStation];
 
   // Display the results
   document.getElementById('route').textContent = route.join(' -> ');
   document.getElementById('fare').textContent = fare + ' units';

}
