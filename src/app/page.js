"use client"

import { useState, useRef } from "react";
import ScatterPlot from "@/components/LineChart";
import LineChart from "@/components/LineChart";

export default function Home() {  
  return (
    <main className="bg-gradient-to-br from-blue-400 to-purple-400 w-full h-screen p-8 flex items-center justify-center flex-col gap-y-4 text-white">
      <div className="flex justify-between w-full flex-col md:flex-row gap-y-2">
        <h1 className="text-3xl font-bold">Tugas Kecil 2 </h1>
        <div>
          <span className="font-bold">Author : </span>13522145, 13522163
        </div>
      </div>
      
      {/* Container untuk menampilkan kurva yang telah dibuat */}
      <div className="w-full h-full rounded-xl flex flex-col md:flex-row items-center justify-start p-4 gap-y-4 gap-x-4">

        {/* Canvas */}
        <div className="w-full h-full bg-white rounded-xl p-4 flex flex-col items-center justify-center">
          <LineChart />
        </div>

        {/* Tempat Input */}
        <div className="w-full h-full bg-white/15 rounded-xl p-4">

        </div>

      </div>
    </main>
  );
}
