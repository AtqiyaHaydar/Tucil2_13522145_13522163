"use client"

import { useState, useRef } from "react";
import { drawBezierCurve } from "@/utils/DrawBezierCurve";

// Function to divide bezier curve
function divideBezier(points, iterations) {
  if (points.length < 2) return [points];
  
  let result = [points];
  for (let i = 0; i < iterations; i++) {
      let newResult = [];
      for (let j = 0; j < result.length; j++) {
          const currentSegment = result[j];
          const divided = [];
          for (let k = 0; k < currentSegment.length - 1; k++) {
              const point1 = currentSegment[k];
              const point2 = currentSegment[k + 1];
              const midPoint = {
                  x: (point1.x + point2.x) / 2,
                  y: (point1.y + point2.y) / 2
              };
              divided.push(point1, midPoint);
          }
          divided.push(result[j][result[j].length - 1]);
          newResult.push(divided);
      }
      result = newResult;
  }
  return result;
}

export default function Home() {
  const [numPoints, setNumPoints] = useState(3)
  const [iterations, setIterations] = useState(0);
  const [points, setPoints] = useState([]);
  const [resultSegments, setResultSegments] = useState([])
  const canvasRef = useRef(null)

  // Fungsi untuk mengenerate titik-titik yang akan digunakan secara random
  const generateRandomPoints = () => {
    const newPoints = []
    for (let i = 0; i < numPoints; i++) {
      newPoints.push({
        x: Math.random() * 500,
        y: Math.random() * 500

        // 500 adalah ukuran canvas
      })
    }
    setPoints(newPoints)
  }

  // Function to draw bezier curve on canvas
  const drawBezierCurveOnCanvas = (segments) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, 500, 500); // Bersihkan canvas
    ctx.beginPath();
    segments.forEach(segment => {
      ctx.moveTo(segment[0].x, segment[0].y);
      for (let i = 1; i < segment.length; i += 2) {
        if (segment[i + 1]) {
          ctx.quadraticCurveTo(segment[i].x, segment[i].y, segment[i + 1].x, segment[i + 1].y);
        } else {
          ctx.lineTo(segment[i].x, segment[i].y);
        }
      }
    });
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  // Fungi untuk menghanldel submit form
  const handleSubmit = (e) => {
    e.preventDefault()
    const segments = divideBezier(points, iterations);
    setResultSegments(segments);
    drawBezierCurveOnCanvas(segments)

    console.log(segments)
  }

  // Fungsi untuk merender kurva hasil
  // const renderResultSegments = () => {
  //   return resultSegments.map((segment, i) => (
  //     <div key={i}>
  //       {drawBezierCurve(segment)}
  //     </div>
  //   ))
  // }

  return (
    <main className="bg-gradient-to-br from-blue-400 to-purple-400 w-full h-screen p-8 flex items-center justify-center flex-col gap-y-4">
      <div className="flex justify-between w-full flex-col md:flex-row gap-y-2">
        <h1 className="text-3xl font-bold">Tugas Kecil 2 </h1>
        <div>
          <span className="font-bold">Author : </span>13522145, 13522163
        </div>
      </div>
      
      {/* Container untuk menampilkan kurva yang telah dibuat */}
      <div className="bg-white w-full h-full rounded-xl flex flex-col items-center justify-start p-4 gap-y-4">

        {/* Form untuk menerima input */}
        <form onSubmit={handleSubmit} className="text-black flex justify-start items-start w-full gap-x-4">
          <label>Jumlah Titik:</label>
          <input type="number" value={numPoints} onChange={(e) => setNumPoints((parseInt(e.target.value)))} className="border-black border-2 rounded-md px-2 max-w-[100px]"/>
          <button type="button" onClick={generateRandomPoints} className="bg-black text-white h-[28px] px-4 rounded-md hover:bg-white hover:text-black transition-all hover:border-2 hover:border-black hover:rounded-md">Generate Points</button>
          <label>Iterations:</label>
          <input type="number" value={iterations} onChange={(e) => setIterations(parseInt(e.target.value))} className="border-black border-2 rounded-md px-2 max-w-[100px]"/>
          <button type="submit" className="bg-black text-white h-[28px] px-4 rounded-md hover:bg-white hover:text-black transition-all hover:border-2 hover:border-black hover:rounded-md">Submit</button>
        </form>

        {/* Menampilkan hasil */}
        <div className="w-full h-full flex items-center justify-center rounded-lg border-2 border-black/10">
          <canvas ref={canvasRef} width={500} height={500}></canvas>
        </div>

      </div>
    </main>
  );
}
