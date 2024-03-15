"use client"

import { useState } from "react";
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
  const [mode, setMode] = useState("3P");

  const coordinatesData = [
    { x: 1, y: 4 },
    { x: 2, y: 6 },
    { x: 3, y: 35 },
    { x: 4, y: 10 },
    { x: 5, y: 21 },
    { x: 6, y: 12 },
  ];

  const handleSubmit = () => {
    console.log("Submit");
  }
  

  return (
    <main className="bg-gradient-to-br from-blue-400 to-purple-400 w-full h-full p-8 flex items-center justify-center flex-col gap-y-4 text-white">
      <div className="flex justify-between w-full flex-col md:flex-row gap-y-2">
        <h1 className="text-3xl font-bold">Tugas Kecil 2 </h1>
        <div>
          <span className="font-bold">Author : </span>13522145, 13522163
        </div>
      </div>
      
      {/* Container untuk menampilkan kurva yang telah dibuat */}
      <div className="w-full h-full rounded-xl flex flex-col md:flex-row items-center justify-start p-4 gap-y-4 gap-x-4">

        {/* Canvas */}
        <div className="w-full h-full min-h-[550px] bg-white rounded-xl p-4 flex flex-col items-center justify-center">
          <LineChart coordinates={coordinatesData} />
        </div>

        {/* Tempat Input */}
        <div className="w-full h-full min-h-[550px] bg-white/15 rounded-xl p-4 flex flex-col items-center md:items-start justify-between gap-y-4">

          {/* Select Mode */}
          <Tabs defaultValue="3-Points">
            <TabsList className="bg-black text-white">
              <TabsTrigger value="3-Points">3-Points</TabsTrigger>
              <TabsTrigger value="N-Points">N-Points</TabsTrigger>
            </TabsList>
            <TabsContent value="3-Points" className="flex flex-row gap-x-4 mt-8">
              <div className="space-y-2">
                <p>Sumbu-X</p>
                <Input type="number" />
                <Input type="number" />
                <Input type="number" />
              </div>
              <div className="space-y-2"> 
                <p>Sumbu-Y</p>
                <Input type="number" />
                <Input type="number" />
                <Input type="number" />
              </div>
            </TabsContent>
            <TabsContent value="N-Points">

            </TabsContent>
          </Tabs>

          <div className="w-full flex justify-center md:justify-start gap-x-4">
            <Button onClick={handleSubmit}>Submit with DnC</Button>
            <Button onClick={handleSubmit}>Submit with BF</Button>
          </div>

        </div>

      </div>
    </main>
  );
}
