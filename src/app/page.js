"use client"

import { useState, useEffect } from "react";

import LineChart from "@/components/LineChart";
import { divideAndConquer } from "@/utils/DivideAndConquer";
import { quadraticBezierGeneratorBruteForce as BruteForce3Point, BezierGeneratorBruteForce as BruteForceNPoint } from "@/utils/BruteForce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function Home() { 
  const [npoints, setNpoints] = useState(3);
  const [iter, setIter] = useState(1);
  const [mode, setMode] = useState('3P');
  const [tempCoordinates, setTempCoordinates] = useState([]);
  const [useCoordinates, setUseCoordinates] = useState([]);
  const [resultCoordinates, setResultCoordinates] = useState([]);
  const [timeExecution, setTimeExecution] = useState(0);
  const [method, setMethod] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { toast } = useToast();

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
    setUseCoordinates(tempCoordinates);
    setTempCoordinates([])
  }

  const handleReset = () => {
    setUseCoordinates([])
    setTempCoordinates([])
    location.reload()
  }

  const handleSubmitDnC = () => {
    setMethod('DnC')
    const start = performance.now()

    const totalIteration = parseInt(iter)
    let coordinatePoints = [];
    coordinatePoints.push(useCoordinates[0])
    let NewPointPoints = (divideAndConquer(useCoordinates, [], [], 0, totalIteration))
    coordinatePoints = [...coordinatePoints, ...NewPointPoints]
    coordinatePoints.push(useCoordinates[useCoordinates.length - 1])
    const end = performance.now()

    setResultCoordinates(coordinatePoints)
    setTimeExecution((end - start).toFixed(3));
  }

  const handleSubmitBF = () => {
    setMethod('BF')

    const start = performance.now()
    let result;
    if (mode === '3P') {
      result = BruteForce3Point(useCoordinates, iter);
    } else if (mode === 'NP') {
      result = BruteForceNPoint(useCoordinates, npoints, iter)
    }
    const end = performance.now()

    setTimeExecution((end - start).toFixed(3));
    setResultCoordinates(result);
  }

  useEffect(() => {
    if (isSubmitted) {
      if (method === 'DnC') {
        handleSubmitDnC()
      } else if (method === 'BF') {
        let result;
        const start = performance.now()
        if (mode === '3P') {
          result = BruteForce3Point(useCoordinates, iter);
        } else if (mode === 'NP') {
          result = BruteForceNPoint(useCoordinates, npoints, iter)
        }
        const end = performance.now()

        setTimeExecution((end - start).toFixed(3));
        setResultCoordinates(result)
      }
    }
  }, [iter])
  
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
          {isSubmitted && (
            <div className="text-black flex flex-row items-center gap-x-2">
              <p>Animasi <span class="text-black/75 text-[14px]">(menaik turunkan iterasi dengan tombol panah atas bawah untuk melihat animasi, input &gt;= 1 dan input &lt;= iter)</span></p>
              
                {/* ANIMASI KURVA */}
                <Input 
                  type="number"
                  value={iter}
                  onChange={(e) => {
                    const inputValue = parseInt(e.target.value);
                    if (inputValue >= 1) {
                      setIter(inputValue);
                    }
                  }}
                  className="w-[100px]"
                  min={1}
                />
            </div>
          )}
        </div>

        {/* MENERIMA MASUKKAN POINTS */}
        <div className="w-full h-full min-h-[550px] bg-white/15 rounded-xl p-4 flex flex-col md:items-start justify-between gap-y-4">
          
          {/* INPUT POINTS */}
          <div className="space-y-8">
            <Tabs defaultValue="3-Points">
              {/* PILIH MODE */}
              <TabsList className="bg-black text-white">
                <TabsTrigger value="3-Points" onClick={() => setMode("3P")}>3-Points</TabsTrigger>
                <TabsTrigger value="N-Points" onClick={() => setMode("NP")}>N-Points</TabsTrigger>
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
                    <Input type="number" onChange={(e) => handleCoordinateChange(index, "x", e.target.value)} placeholder="x"/>
                    <Input type="number" onChange={(e) => handleCoordinateChange(index, "y", e.target.value)} placeholder="y"/>
                  </div>
                ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* SAVE POINTS*/}
            <div className="space-x-4">
              <Button onClick={() => {
                handleSavePoints()
                toast({
                  title: "Points Saved!",
                  description: "You don't need to input the points again."
                })
              }}>Save Points</Button>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          </div>
          

          {/* SUBMIT POINTS */}
          <div className="w-full flex flex-col justify-center md:justify-start gap-y-4">
            <div className="w-full h-[1px] bg-white/25" />
            <div className="space-y-2">
              <p className="font-semibold">Masukkan jumlah iterasi <span className="text-[14px] font-normal">(min 1)</span></p>
              <Input min={1} type="number" value={iter} onChange={(e) => setIter(e.target.value)} className="max-w-[250px] text-black" />
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Button onClick={() => {
                toast({
                  title: "Submitted With Divide And Conquer!",
                  description: "The result is shown in the graph."
                })
                handleSubmitDnC()
                setIsSubmitted(true)
              }}>Submit with DnC</Button>
              <Button onClick={() => {
                toast({
                  title: "Submitted With Brute Force!",
                  description: "The result is shown in the graph."
                })
                handleSubmitBF()
                setIsSubmitted(true)
              }}>Submit with BF</Button>
              <p className="ml-[75px]">Time Execution : {timeExecution} ms </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
