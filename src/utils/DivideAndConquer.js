const midPoint = (p0, p1) => ({
  x: (parseFloat(p0.x) + parseFloat(p1.x)) / 2,
  y: (parseFloat(p0.y) + parseFloat(p1.y)) / 2
});

export const divideAndConquer = (points, left, right, iteration, iterations) => {
  let leftPoints = [points[0]];
  let rightPoints = [points[points.length - 1]];

  while (points.length > 1) {
    let newPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
      newPoints.push(midPoint(points[i], points[i + 1]));
    }

    leftPoints = leftPoints.concat([newPoints[0]]);
    rightPoints = [newPoints[newPoints.length - 1]].concat(rightPoints);
    points = newPoints;
  }

  if (iteration === iterations - 1) {
    return points;
  } else {
    iteration += 1;
    return divideAndConquer(
      leftPoints.concat(points), left, points, iteration, iterations
    ).concat(points).concat(divideAndConquer(points.concat(rightPoints), [], right, iteration, iterations));
  }
};