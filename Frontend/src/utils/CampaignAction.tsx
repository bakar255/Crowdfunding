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
    const nextId = await contract.nextOrderId();
    if (Number(campaignId) >= Number(nextId)) {
      throw new Error("Campaign ID does not exist");
    }

    const campaign = await contract['showCampaign(uint256)'](campaignId);

    if (campaign.creator === ethers.ZeroAddress) {
      throw new Error("Campaign data corrupted");
    }

    return {
      goal: campaign.goal,
      id: campaign.id,
      duration: campaign.duration,
      creator: campaign.creator,
      balance: ethers.formatEther(campaign.balance.toString()),
      isActive: campaign.isActive,
      deadline: new Date(Number(campaign.deadlineDuration) * 1000),
    };
    
  } catch (error) {
    console.error("Debug details:", {
      error,
      contractAddress: contract.target,
      network: await contract.provider.getNetwork()
    });
    throw new Error(error.reason || "Failed to fetch campaign");
  }
};