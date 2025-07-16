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
