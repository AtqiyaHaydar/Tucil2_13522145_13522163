"use client"

import { useState, useEffect } from "react";

import LineChart from "@/components/LineChart";
import { DivideAndConquer } from "@/utils/DivideAndConquer";
import { quadraticBezierGeneratorBruteForce as BruteForce } from "@/utils/BruteForce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Home() { 
  const [npoints, setNpoints] = useState(3);
  const [iter, setIter] = useState(0);
  const [tempCoordinates, setTempCoordinates] = useState([]);
  const [useCoordinates, setUseCoordinates] = useState([]);
  const [resultCoordinates, setResultCoordinates] = useState([]);

  const handleCoordinateChange = (index, axis, value) => {
    setTempCoordinates(prevCoordinates => {
      const updatedCoordinates = [...prevCoordinates];
      const coordinate = updatedCoordinates[index] || {};

      if (axis === 'x') {
        if (coordinate.y === 0 && coordinate.x !== undefined && coordinate.x.length > 1) {
          coordinate.x = value;
        } else {
          coordinate[axis] = value;
        }
      } else {
        coordinate[axis] = value;
      }

      updatedCoordinates[index] = coordinate;
      return updatedCoordinates;
    });
  };

  const handleSavePoints = () => {
    console.log(tempCoordinates)
    setUseCoordinates(tempCoordinates);
    setTempCoordinates([])
  }

  const handleReset = () => {
    setUseCoordinates([])
    setTempCoordinates([])
    location.reload()
  }

  const handleSubmitDnC = () => {
    console.log("Submit DnC");
    const result = DivideAndConquer(useCoordinates, iter);
    console.log(result);

    setResultCoordinates(result);
  }

  const handleSubmitBF = () => {
    console.log("Submit BF");
    const result = BruteForce(useCoordinates, iter);
    console.log(result);

    setResultCoordinates(result);
  }
  

  return (
    <main className="bg-gradient-to-br from-blue-400 to-purple-400 w-full h-full p-8 flex items-center justify-center flex-col gap-y-4 text-white">

      {/* TITLE */}
      <div className="flex justify-between w-full flex-col md:flex-row gap-y-2">
        <h1 className="text-3xl font-bold">Tugas Kecil 2 </h1>
        <div>
          <span className="font-bold">Author : </span>13522145, 13522163
        </div>
      </div>
      
      <div className="w-full h-full rounded-xl flex flex-col md:flex-row items-center justify-start p-4 gap-y-4 gap-x-4">

        {/* MENAMPILKAN GRAFIK */}
        <div className="w-full h-full min-h-[550px] bg-white rounded-xl p-4 flex flex-col items-center justify-center">
          <LineChart coordinates={resultCoordinates} />
        </div>

        {/* MENERIMA MASUKKAN POINTS */}
        <div className="w-full h-full min-h-[550px] bg-white/15 rounded-xl p-4 flex flex-col md:items-start justify-between gap-y-4">
          
          {/* INPUT POINTS */}
          <div className="space-y-8">
            <Tabs defaultValue="3-Points">
              {/* PILIH MODE */}
              <TabsList className="bg-black text-white">
                <TabsTrigger value="3-Points">3-Points</TabsTrigger>
                <TabsTrigger value="N-Points">N-Points</TabsTrigger>
              </TabsList>

              {/* MASUKKAN 3POINT */}
              <TabsContent value="3-Points" className="flex flex-row gap-x-4 mt-8">
                <div className="space-y-2 text-black">
                  <p className="text-white">Sumbu-X</p>
                  <Input type="number" onChange={(e) => handleCoordinateChange(0, "x", e.target.value)} />
                  <Input type="number" onChange={(e) => handleCoordinateChange(1, "x", e.target.value)} />
                  <Input type="number" onChange={(e) => handleCoordinateChange(2, "x", e.target.value)} />
                </div>
                <div className="space-y-2 text-black"> 
                  <p className="text-white">Sumbu-Y</p>
                  <Input type="number" onChange={(e) => handleCoordinateChange(0, "y", e.target.value)} />
                  <Input type="number" onChange={(e) => handleCoordinateChange(1, "y", e.target.value)} />
                  <Input type="number" onChange={(e) => handleCoordinateChange(2, "y", e.target.value)} />
                </div>
              </TabsContent>

              {/* MASUKKAN NPOINTS */}
              <TabsContent value="N-Points">
                <div>
                  <p>Masukkan jumlah titik</p>
                  <Input className="text-black max-w-[250px] mt-2" type="number" value={npoints} onChange={(e) => setNpoints(parseInt(e.target.value))} />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-x-4">
                {Array.from({ length: npoints }, (_, index) => (
                  <div key={index} className="space-y-2 mt-2 text-black">
                    <p className="text-white">Titik ke-{index+1}</p>
                    <Input type="number" onChange={(e) => handleCoordinateChange(index, "x", e.target.value)} />
                    <Input type="number" onChange={(e) => handleCoordinateChange(index, "y", e.target.value)} />
                  </div>
                ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* SAVE POINTS*/}
            <div className="space-x-4">
              <Button onClick={handleSavePoints}>Save Points</Button>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          </div>
          

          {/* SUBMIT POINTS */}
          <div className="w-full flex flex-col justify-center md:justify-start gap-y-4">
            <div className="w-full h-[1px] bg-white/25" />
            <div className="space-y-2">
              <p className="font-semibold">Masukkan jumlah iterasi</p>
              <Input type="number" value={iter} onChange={(e) => setIter(e.target.value)} className="max-w-[250px] text-black" />
            </div>
            <div className="space-x-4">
              <Button onClick={handleSubmitDnC}>Submit with DnC</Button>
              <Button onClick={handleSubmitBF}>Submit with BF</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// TO DO
// 1. Menampilkan waktu eksekusi
// 2. Implementasi fungsi DnC dan BF
// 3. Menampilan proses iterasi, atau menyimpan hasil iterasi menggunakan slider