"use client"

import { useState, useEffect } from "react";
import { getContract } from "@/utils/contract";
import { createCampaign, getCampaignById, contribute } from '@utils/CampaignAction';
import { ethers } from "ethers";
import  CampaignList  from "@utils/Campaign";
import { FaHandHoldingDroplet } from "react-icons/fa6";
import Hero from "./components/Hero";


interface Campaign {
  id: bigint | string;
  goal: bigint;
  duration: bigint | number;
  creator: string;
  balance: string;
  isActive: boolean;
  deadline: Date;
}

export default function Home() {  
  const [popUp, setPopUp ] = useState(false);
  const [days, setDays] = useState<number>(1);
  const [goal, setGoal] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [campaignId, setCampaignId] = useState<string>("");
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [error, setError] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [success, setSuccess] = useState('');
  const [allCampaigns, setAllCampaigns] = useState([]);


  const handleCreateCampaign = async () => {
    if (!goal) {
      setError("Please enter a goal");
      return;
    }

    setIsLoading(true);
    try {
      const txHash = await createCampaign(goal, days); 
      console.log("Transaction hash:", txHash);
      setError("");
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!campaignId.trim()) {
    setError("Please enter a valid campaign ID");
    return;
  }

  setIsLoading(true);
  setError("");
  setCampaign(null);

  try {
    const campaignData = await getCampaignById(campaignId);
    
    setCampaign({
      id: campaignId,  
      goal: campaignData.goal,
      creator: campaignData.creator,
      balance: campaignData.balance,
      isActive: campaignData.isActive,
      deadline: campaignData.deadline,
      duration: campaignData.duration
    });

  } catch (error: any) {
    console.error("Campaign fetch error:", error);
    setError(error.message || "Failed to fetch campaign details");
  } finally {
    setIsLoading(false);
  }
};

  return (

    <div className="min-h-screen bg-blend-color bg-[#cacaca]">
      <nav className="sticky w-full flex inset-0 z-50 bg-white navbar-expand-lg shadow-md min-h-13 items-center p-6 mx-auto">
        <FaHandHoldingDroplet  className="bg-amber-500 rounded-lg w-10 h-10 p-1"/>
        <span className="text-black font-bold ml-2 ">Crowdfuding platform</span>
          <div className="text-black flex justify-between flex-1">
           <ul className=" flex space-x-14 mt-1.5 ml-79">
            <a href="" className="text-gray-500 transition-all ease-in duration-400 hover:text-amber-500">Community</a>
            <a href=""  className="text-gray-500 hover:text-amber-500 transition-all ease-in duration-400">Donation</a>
            <a href=""  className="text-gray-500 hover:text-amber-500 transition-all ease-in duration-400">Crisis</a>
           </ul>
           <button className="rounded-full p-5 text-black py-1 shadow-lg font-bold cursor-pointer hover:text-amber-500 transition-all ease-in duration-400">Start a Fundraising</button>
        </div>
      </nav>
    <main>
     <Hero />
    </main>

    <footer>
      
    </footer>
    </div>
    
  );
}

