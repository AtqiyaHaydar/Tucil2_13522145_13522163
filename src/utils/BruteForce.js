
// function to generate pascal triangle
function pascalTriangle(n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result[i] = new Array(i + 1);
    result[i][0] = 1;
    result[i][i] = 1;
    for (let j = 1; j < i; j++) {
      result[i][j] = result[i - 1][j - 1] + result[i - 1][j];
    }
  }
  return result[n - 1];
}


// Functions to generate points on beizer curve with the iteration of the curve
function quadraticBezierFormula(points, t) {
  const x = Math.pow(1 - t, 2) * points[0].x + 2 * (1 - t) * t * points[1].x + Math.pow(t, 2) * points[2].x;
  const y = Math.pow(1 - t, 2) * points[0].y + 2 * (1 - t) * t * points[1].y + Math.pow(t, 2) * points[2].y;
  return { x, y };
}

export function quadraticBezierGeneratorBruteForce(points, iterations) {
  let result = [];

  for (let i = 0; i <= iterations; i++) {
      const t = i / iterations;
      const point = quadraticBezierFormula(points, t);
      result.push(point);
  }

  return result;
}

