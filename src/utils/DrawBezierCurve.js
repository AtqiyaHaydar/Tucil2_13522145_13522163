// utils/bezier.js

// Function to draw bezier curve
export function drawBezierCurve(points) {
  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 2) {
      if (points[i + 1]) {
          ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
      } else {
          ctx.lineTo(points[i].x, points[i].y);
      }
  }
  ctx.strokeStyle = 'black';
  ctx.stroke();
  return canvas;
}
