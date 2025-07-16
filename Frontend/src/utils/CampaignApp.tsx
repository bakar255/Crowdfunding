import { getContract } from "./contract";
import { useState } from "react";

export default function CampaingApp() {

    const [campaignGoal, setCampaignGoal] = useState("");

async function createCampaign{
    try {
        const contract =  await getContract();
        const tx = await contract.createCampaign();
        await tx.wait();
        alert("Campaign created"); 
    } catch (error) {
        console.log("Error to get campaign function");
    }

    return (
        <div className="h-45 flex items-center justify-center bg-gray-900">
                <button onClick={createCampaign}>CreateCampaign</button>
        </div>

    );

}
}