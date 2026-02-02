/**
 * Calculate real-world distance between two GPS points
 * using Haversine formula
 */
function haversineDistance(a, b) {
  const R = 6371; // Earth radius in KM

  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lng - a.lng) * Math.PI) / 180;

  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Greedy Nearest Neighbor Route Optimization
 * @param {Array} stops [{ houseId, lat, lng, wasteTypes }]
 * @param {Object} start { lat, lng }
 */
export function optimizeRoute(stops, start) {
  const unvisited = [...stops];
  const route = [];

  let current = start;
  let totalDistance = 0;

  while (unvisited.length > 0) {
    let closestIndex = 0;
    let minDistance = haversineDistance(current, unvisited[0]);

    for (let i = 1; i < unvisited.length; i++) {
      const dist = haversineDistance(current, unvisited[i]);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    }

    const nextStop = unvisited.splice(closestIndex, 1)[0];
    route.push(nextStop);
    totalDistance += minDistance;
    current = nextStop;
  }

  return {
    route,
    totalStops: route.length,
    totalDistanceKm: Number(totalDistance.toFixed(3)),
  };
}
