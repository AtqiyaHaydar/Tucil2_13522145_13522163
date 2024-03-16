function midpoint(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2
  }
}

function bezierControlPoint(p0, p1, p2, t) {
  return {
    x: Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x,
    y: Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y
  }
}

export function DivideAndConquer(points, iter) {
  if (iter === 0) {
    return points;
  }

  const newPoints = [];
  for (let i = 0; i < points.length - 1; i++) {
    const midPoint = midpoint(points[i], points[i + 1]);
    newPoints.push(midPoint);
  }


  const bezierPoints = [];
  for (let i = 0; i < newPoints.length - 1; i++) {
    const t = i / (newPoints.length - 1);
    const controlPoint = bezierControlPoint(newPoints[i], points[i + 1], newPoints[i + 1], t);
    bezierPoints.push(controlPoint);
    bezierPoints.push(newPoints[i + 1]);
  }

  const updatedPoints = []
  for (let i = 0; i < points.length; i++) {
    updatedPoints.push(points[i]);
    if (i < points.length - 1) {
      updatedPoints.push(bezierPoints[i]);
    }
  }

  return DivideAndConquer(updatedPoints, iter - 1);
}
