"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import LineChart from "@/components/LineChart";

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
  const [iter, setIter] = useState(1);
  const [tempCoordinates, setTempCoordinates] = useState([]);
  const [useCoordinates, setUseCoordinates] = useState([])

  const router = useRouter();

  const handleCoordinateChange = (index, axis, value) => {
    setTempCoordinates(prevCoordinates => {
      const updatedCoordinates = [...prevCoordinates];
      const coordinate = updatedCoordinates[index] || {}; // Membuat objek koordinat baru jika belum ada
      coordinate[axis] = value; // Mengatur nilai sumbu x atau y sesuai dengan sumbu yang dipilih
      updatedCoordinates[index] = coordinate;
      return updatedCoordinates;
    });
  };

  const handleSavePoints = () => {
    // Fungsi sementara, TO DO mengganti
    setUseCoordinates(tempCoordinates);
    setTempCoordinates([])
    router.push("/")
  }

  const handleReset = () => {
    setUseCoordinates([])
    setTempCoordinates([])
    router.refresh()
  }

  const handleSubmitDnC = () => {
    console.log("Submit DnC");
  }

  const handleSubmitBF = () => {
    console.log("Submit BF");
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
          <LineChart coordinates={useCoordinates} />
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
                  <Input type="number" onChange={(e) => setTempCoordinates(prevState => [...prevState, { x: e.target.value }])} />
                  <Input type="number" onChange={(e) => setTempCoordinates(prevState => [...prevState, { x: e.target.value }])} />
                  <Input type="number" onChange={(e) => setTempCoordinates(prevState => [...prevState, { x: e.target.value }])} />
                </div>
                <div className="space-y-2 text-black"> 
                  <p className="text-white">Sumbu-Y</p>
                  <Input type="number" onChange={(e) => setTempCoordinates(prevState => [...prevState.slice(0, -1), { ...prevState.slice(-1)[0], y: e.target.value }])} />
                  <Input type="number" onChange={(e) => setTempCoordinates(prevState => [...prevState.slice(0, -1), { ...prevState.slice(-1)[0], y: e.target.value }])} />
                  <Input type="number" onChange={(e) => setTempCoordinates(prevState => [...prevState.slice(0, -1), { ...prevState.slice(-1)[0], y: e.target.value }])} />
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
                    <Input className="text-black max-w-[200px]" type="number" onChange={(e) => handleCoordinateChange(index, "x", e.target.value)} />
                    <Input className="text-black max-w-[200px]" type="number" onChange={(e) => handleCoordinateChange(index, "y", e.target.value)} />
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
              <Input placeholder="1" value={iter} onChange={(e) => setIter(e)} className="max-w-[250px]" />
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
