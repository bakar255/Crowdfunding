import { ethers } from "ethers";
import { getContract } from "./contract";
import { useState } from "react";

export default function CampaignApp() {

    const [campaignGoal, setCampaignGoal] = useState("");

        const createCampaign = async () => {
        try {
            const contract = await getContract();
            const tx = await contract.createCampaign();
            await tx.wait();
            alert("Campaign created"); 
        } catch (error) {
            console.error("Error creating campaign:", error);
            alert("Failed to create campaign");
        }
    };

  
     const endCampaign = async (campaingId: number) => {
        const contract = await getContract();
        try {
            const tx = await contract.endCampaign(campaingId);
            const Campaign = await contract.showCampaign(campaingId);
            return {
                goal: ethers.formatEther(Campaign.goal),
                balance: ethers.formatEther(Campaign.balance),
            };
        }  catch (error) {
            console.error("Error to endCampaign and fetch details", error);
        }

    } 

     const getCampaignById = async (campaignId: number) => {
        const contract = await getContract(); // new ethers.contract(address, abi, provider)
        
        const campaign = await contract.showCampaign(campaignId)
        return {  
            goal: ethers.formatEther(campaign.goal),
            creator: campaign.creator,
            balance: ethers.formatEther(campaign.balance),
            isActive: campaign.isActive,
            deadline: campaign.duration,
        }
    }

         const CampaignAll = async () => {
        const contract = await getContract();
        const count = await contract.campaignCount();
        const campaigns = [];

        for (let i = 0; i < count; i++) {
            campaigns.push(await contract.campaigns(i));
        }

        return campaigns;
    }

    return (
        <div className="h-45 flex items-center justify-center bg-gray-900">
            <button 
                onClick={createCampaign} 
                className="p-10 bg-amber-400"
            >
                Create Campaign
            </button>
        </div>
    );
}
