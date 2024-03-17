function calculateMidpoint(p0, p1, t) {
  return {
    x: (1 - t) * p0.x + t * p1.x,
    y: (1 - t) * p0.y + t * p1.y
  }
}

export function divideAndConquer(points, iterations) {
  if (iterations === 0) {
    return points;
  } else {
    let newPoints = [];
    newPoints.push(points[0]); // Menambahkan titik awal
    for (let i = 0; i < points.length - 1; i++) {
      if (i !== points.length - 1) {
        const q = calculateMidpoint(points[i], points[i + 1], 0.5);
        newPoints.push(q);
      }
    }
    newPoints.push(points[points.length - 1]); // Menambahkan titik akhir
    return divideAndConquer(newPoints, iterations - 1);
  }
}
