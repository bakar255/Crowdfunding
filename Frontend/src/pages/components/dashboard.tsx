"use client"

import { useState, useEffect } from "react";
import { getContract } from "@/utils/contract";
import { createCampaign, getCampaignById, contribute } from '@utils/CampaignAction';
import { ethers } from "ethers";
import  CampaignList  from "@utils/Campaign";

interface Campaign {
  id: bigint | string;
  goal: bigint;
  duration: bigint | number;
  creator: string;
  balance: string;
  isActive: boolean;
  deadline: Date;
}

export default function Dashboard() {  
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
    <div className="min-h-screen flex flex-col bg-[#2b2b2b]">
      <header className="bg-gray-800 w-full p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Crowdfunding Platform</h1>
          <div className="space-x-7">
          <a href="/campaigns" className="button-navbar">Campaigns</a>
          <a href="" className="button-navbar">Dashboard</a>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <section>

        </section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-white text-xl font-semibold mb-4">Find Campaign</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="campaign-id" className="block text-gray-300 mb-2">
                  Campaign ID:
                </label>
                <input
                  id="campaign-id"
                  type="text"
                  value={campaignId}
                  onChange={(e) => setCampaignId(e.target.value)}
                  placeholder="Enter campaign ID"
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded font-medium ${isLoading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isLoading ? "Loading..." : "View Campaign"}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-2 bg-red-900 text-red-200 rounded">
                {error}
              </div>
            )}

            {campaign && (
                <div className="border rounded-lg p-4 bg-[#2b2b2b] shadow mt-10">
          <h3 className="text-xl font-bold mb-3">Campaign Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">ID:</p>
              <p>{campaign.id.toString()}</p>
            </div>
            <div>
              <p className="font-semibold">Creator:</p>
              <p className="truncate">{campaign.creator}</p>
            </div>
            <div>
              <p className="font-semibold">Goal:</p>
              <p>{campaign.goal} ETH</p>
            </div>
            <div>
              <p className="font-semibold">Duration:</p>
              <p>{Number(campaign.duration)} seconds</p>
            </div>
            <div>
              <p className="font-semibold">Balance:</p>
              <p>{campaign.balance} ETH</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p>{campaign.isActive ? 'Active 🟢' : 'Ended 🔴'}</p>
            </div>
            <div className="col-span-2">
              <p className="font-semibold">Deadline:</p>
              <p>{campaign.deadline.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
          </section>

          <section className="bg-[#2b2b2b] rounded-lg p-6 shadow-lg">
            <h2 className="text-white text-xl font-semibold mb-4">Create New Campaign</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Funding Goal (ETH)</label>
                <input 
                  type="text" 
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)} 
                  placeholder="Enter funding goal"
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Duration (days)</label>
                <select 
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))} 
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  {[1, 2, 3].map(day => (
                    <option key={day} value={day}>{day} day{day > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleCreateCampaign}
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded font-medium ${isLoading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isLoading ? "Creating..." : "Create Campaign"}
              </button>
            </div>
          </section>
        </div>  
        
      </main>

      <footer className="bg-[#2b2b2b] p-4 text-center text-gray-400">
        <p>Crowdfunding Platform</p>
      </footer>
    </div>
  );
}

