"use client"

import { useState } from "react";
import { getContract } from "@/utils/contract";
import  CampaignApp  from "@utils/Campaign";
import { createCampaign, getCampaignById } from '@utils/CampaignAction'
import { dataLength, ethers } from "ethers";
import { addListener } from "process";

export default function Home() {

  const [popUp, setPopUp] = useState(false);
  const [days, setDays] = useState<number>(1);
  const [goal, setGoal] = useState("")
  const [campaignId, setCampaignId] = useState("");

  const handleCampaign = async () => {
  try {
    const txHash = await createCampaign(goal, days ); // "100" au lieu de 100
    console.log("Transaction hash:", txHash);
  } catch (error) {
    alert(`Erreur: ${error.message}`);
  }
};

 const handleFetchCampaign = async () => {
    const id = campaignId.trim();
    
    if (!id || !/^\d+$/.test(id)) { 
      alert("Veuillez entrer un ID valide (nombre entier positif).");
      return;
    }
    try {
      const campaignData = await getCampaignById(ethers.BigNumber.from(id)); // Solution recommandée
      console.log("Campaign Data:", campaignData);
    } catch (error) {
      console.error("Error fetching campaign:", error);
      alert("Erreur : L'ID doit être un nombre valide ou la campagne n'existe pas.");
    }
};

return (
  <div className="min-h-screen flex flex-col">

    <nav className="bg-gray-800 w-full p-4">
      <div className="max-w-6xl mx-auto">
        <div className="justify-between">
          <span>Crowfunding</span>
        </div>
        <ul className="flex justify-center space-x-4">
        </ul>
      </div>
       </nav>
    <main className="flex-grow flex items-center justify-center p-4">
      <div className="rounded-lg bg-gray-600 p-6 max-w-4xl w-[min-h-120]">
        <div className="flex flex-col justify-between items-center mb-4">
      <span className="text-white text-xl font-semibold ">Dashboard</span>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition-colors"
            onClick={() => setPopUp(true)}>
            Create Campaign
          </button>          
             </div>
          { popUp && (
            <div className=" fixed z-50 inset-0 rounded-lg  backdrop-blur-xs flex justify-center items-center">
              <div className="rounded-lg bg-[#0f0f0f] w-2/8 h-3/8 p-5 relative">
               <div className="flex-col flex items-center">
                <span className="text-white font-bold text-2xl"> Create Campaign</span>
                  <div className="justify-between mt-5 flex">
                    <span className="mx-5 mt-2 text-left">Goal</span>
                    <input type="text" className="p-1 rounded-lg border-10" onChange={(e) => setGoal(e.target.value)} />
                    </div>
                    <div className="p-2 mt-2">
                      <span>Days</span>
                      <select name="" id="" onChange={(e) => setDays(Number(e.target.value))} className="rounded-lg mx-6 w-full">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                    <button className="bg-green-600 absolute bottom-5 block rounded-lg p-3" onClick={handleCampaign}>Create</button>
                   <button onClick={() => setPopUp(false)} className="absolute right-0">x</button>
                </div>
               </div>
              </div>
          )};
       </div>
      </div>
    </main>

    <footer className="">
    </footer>
  </div>
);

}
