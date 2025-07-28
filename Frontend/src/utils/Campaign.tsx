import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from "./contract";

export default function CampaignList() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            setLoading(true);
            try {
                const contract = await getContract();
                const count = await contract.nextOrderId();
                
                const campaignsData = [];
                for (let i = 0; i < count; i++) {
                    const campaign = await contract.showCampaign(i);
                    campaignsData.push({
                     id: i,
                     goal: campaign.goal,
                     creator: campaign.creator,
                     balance: ethers.formatEther(campaign.balance),
                    
                    isActive: campaign.isActive,
                        deadline: campaign.deadlineDuration
                    });
                }
                
                setCampaigns(campaignsData);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to load campaigns");
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>All Campaigns</h2>
            <div>
                {campaigns.map(campaign => (
                    <div key={campaign.id} className="flex-shrink-0 mx-4">
                            <div className="rounded-lg bg-gray-400 h-90 min-w-[1px]">
                            <h3>{campaign.goal}</h3>
                            <p>ID: {campaign.id}</p>
                            <p>Balance: {campaign.balance} ETH</p>
                            <p>Creator: {campaign.creator}</p>
                            <p>Status: {campaign.isActive ? "Active" : "Ended"}</p>
                            <p>Balance: {campaign.balance} ETH</p>
                        </div>
                  </div>
                ))}
            </div>
        </div>
    );
}