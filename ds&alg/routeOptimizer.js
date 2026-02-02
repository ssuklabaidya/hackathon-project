// Load the new 50-household dataset
const households = require('./households.json');

// Start point: Center of Ward-5 (based on your coordinates)
const startPoint = { lat: 26.1441, lng: 91.7361 };

/**
 * Calculates straight-line distance between two points
 */
function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.lat - p2.lat, 2) + Math.pow(p1.lng - p2.lng, 2));
}

/**
 * Nearest Neighbor Algorithm
 */
function findShortestRoute(data, start) {
    let unvisited = [...data];
    let currentPos = start;
    let optimizedPath = [];

    while (unvisited.length > 0) {
        let closestIndex = 0;
        let minDistance = getDistance(currentPos, unvisited[0]);

        for (let i = 1; i < unvisited.length; i++) {
            let d = getDistance(currentPos, unvisited[i]);
            if (d < minDistance) {
                minDistance = d;
                closestIndex = i;
            }
        }

        // Move to the closest house
        let nextStop = unvisited.splice(closestIndex, 1)[0];
        optimizedPath.push(nextStop);
        currentPos = nextStop; 
    }
    return optimizedPath;
}

// Generate the route
const shortRoute = findShortestRoute(households, startPoint);

// Print the output clearly
console.log(`==========================================`);
console.log(`WARD-5 WASTE COLLECTION: OPTIMIZED ROUTE`);
console.log(`Total Households: ${shortRoute.length}`);
console.log(`==========================================`);

shortRoute.forEach((house, index) => {
    const stopNumber = (index + 1).toString().padStart(2, '0');
    console.log(`Stop ${stopNumber} | ID: ${house.houseId} | Ward: ${house.ward} | Lat: ${house.lat}`);
});

console.log(`==========================================`);
console.log(`Route calculation complete.`);
