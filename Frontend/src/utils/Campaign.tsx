import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from "./contract";

export default function CampaignList() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const contract = await getContract();
                const count = contract.nextOrderId(); 
                
                const campaignPromises = [];
                for (let i = 0; i < count; i++) {
                    campaignPromises.push(contract.showCampaign(i));
                }

                const rawCampaigns = await Promise.all(campaignPromises);
                
                const formattedCampaigns = rawCampaigns.map((campaign, index) => ({
                    id: index,
                    goal: campaign.goal,
                    creator: campaign.creator,
                    balance: ethers.formatEther(campaign.balance),
                    isActive: campaign.isActive,
                    deadline: new Date(Number(campaign.deadlineDuration) * 1000),
                    formattedBalance: ethers.formatEther(campaign.balance)
                }));

                setCampaigns(formattedCampaigns);
            } catch (err) {
                console.error("Failed to fetch campaigns:", err);
                setError("Failed to load campaigns");
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h2 className="text-2xl font-bold text-white mb-6">All Campaigns</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {campaigns.map((campaign) => (
                ))}
            </div>
        </div>
    );
}