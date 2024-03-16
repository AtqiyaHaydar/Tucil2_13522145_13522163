export function BruteForce(points, iter) {
  const x = Math.pow(1 - t, 2) * points[0].x + 2 * (1 - t) * t * points[1].x + Math.pow(t, 2) * points[2].x;
  const y = Math.pow(1 - t, 2) * points[0].y + 2 * (1 - t) * t * points[1].y + Math.pow(t, 2) * points[2].y;
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