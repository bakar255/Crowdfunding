import { ethers } from "ethers";
import { getContract } from "./contract";
import { useState } from "react";
import { create } from "domain";

export default function CampaignApp() {

    const [campaignGoal, setCampaignGoal] = useState("");

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
                className="p-10 bg-amber-400">
            </button>
            <button>

            </button>
        </div>
    );
}

