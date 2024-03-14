
// Functions to generate points on beizer curve with the iteration of the curve
function quadraticBezierFormula(points) {
  const x = Math.pow(1 - t, 2) * points[0].x + 2 * (1 - t) * t * points[i].x + Math.pow(t, 2) * points[2].x;
  const y = Math.pow(1 - t, 2) * points[0].y + 2 * (1 - t) * t * points[i].y + Math.pow(t, 2) * points[2].y;
  return { x, y };
}

function quadraticBezierGeneratorBruteForce(points, iterations) {
  let result = [];

  console.time('Brute Force');
  for (let i = 0; i <= iterations; i++) {
      const t = i / iterations;
      const point = quadraticBezierBruteForce(points, t);
      result.push(point);
  }
  console.timeEnd('Brute Force');
  return result;
}