// function calculateMidpoint(p0, p1, t) {
//   return {
//     x: (1 - t) * p0.x + t * p1.x,
//     y: (1 - t) * p0.y + t * p1.y
//   }
// }

// export function divideAndConquer(points, iterations) {
//   if (iterations === 0) {
//     return points;
//   } else {
//     let newPoints = [];
//     newPoints.push(points[0]); // Menambahkan titik awal
//     for (let i = 0; i < points.length - 1; i++) {
//       if (i !== points.length - 1) {
//         const q = calculateMidpoint(points[i], points[i + 1], 0.5);
//         newPoints.push(q);
//       }
//     }
//     newPoints.push({ x: points[points.length - 1].x, y: points[points.length - 1].y }); // Menambahkan titik akhir
//     return divideAndConquer(newPoints, iterations - 1);
//   }
// }

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

    let midPointIndex = Math.floor(points.length / 2);

    const leftPoints = conquerLeft(points.slice(0, midPointIndex + 1))
    const rightPoints = conquerRight(points.slice(midPointIndex))

    newPoints = [...leftPoints, ...rightPoints]

    return divideAndConquer(newPoints, iterations - 1);
  }
}

function conquerLeft(points) {
  let leftPoints = [];

  // Menambahkan titik awal dari input
  leftPoints.push(points[0]);

  for (let i = 0; i < points.length - 1; i++) {
    const q = calculateMidpoint(points[i], points[i + 1], 0.5);
    leftPoints.push(q); 
  }

  return leftPoints;
}

function conquerRight(points) {
  let rightPoints = [];

  for (let i = 0; i < points.length - 1; i++) {
    const q = calculateMidpoint(points[i], points[i + 1], 0.5);
    rightPoints.push(q); 
  }

  // Menambahkan titik akhir dari input
  rightPoints.push(points[points.length - 1])

  return rightPoints;
}