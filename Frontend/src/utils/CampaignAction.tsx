import { ethers } from "ethers";
import { getContract } from "./contract";

export const createCampaign = async (goal: string, durationDays: number) => {
  try {
    const contract = await getContract();

    const tx = await contract.createCampaign(goal, 
      durationDays
    );
    const receipt = await tx.wait();
    return {
      success: true,
      txHash: tx.hash,
      blockNumber: receipt.blockNumber
    };
    
  } catch (error) {
    console.error("Erreur création campagne:", error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue"
    };
  }
};
  
     export const endCampaign = async (campaingId: number) => {
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
    
     const contribute = async (campaignId: number, amount: number, 
        callbacks: {
         Success?: (txHash: string) => void;
         Error?: (error:Error) => void;
         PendingTx?: () => void;
        }
         ) => {
            try {

        const goalEth = ethers.utils.parseEther(amount.toString());
        
        callbacks.PendingTx?.();

        const contract = await getContract();

        const tx = await contract.applyContribution(campaignId,
       {amount: ethers.parseEther(amount.toString())} );

       await tx.wait();

       callbacks.Success?.(tx.hash);

        } catch (error) {
            callbacks.Error?.(new Error('Error'));
        };
    }


export const getCampaignById = async (campaignId) => {
    const contract = await getContract();
    
    try {
        const id = BigInt(campaignId); 
        
        const campaign = await contract.showCampaign(id);
        console.log("Campaign Data from Contract:", campaign);

        return {  
            goal: ethers.formatEther(campaign.goal),
            creator: campaign.creator,
            balance: ethers.formatEther(campaign.balance),
            isActive: campaign.isActive,
            deadline: campaign.duration,
        };
    } catch (error) {
        console.error("Error fetching campaign:", error);
        throw new Error("ID invalide ou erreur du contrat.");
    }
};