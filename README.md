## Campaign Funds

A decentralized crowdfunding platform built on Ethereum, enabling campaign creation, ETH contributions.

##  Features

Create Campaigns with custom goals

Contribute ETH to active campaigns

Secure Withdrawals by campaign creators

## 📖 Usage Example
```solidity
// 1. Create a campaign
uint256 id = campaignFunds.createCampaign("Build the best Web 3 in the world !");

// 2. Contribute (from another address)
vm.prank(donor);
campaignFunds.applyContribution{value: 0.5 ether}(id);

// 3. View campaign 
Campaign memory campaign = campaignFunds.showCampaign(id);
console.log("Current balance:", c.balance);
```

## Backend

- Advanced hooks to use functions from contract deployed on-chain

```typescript

export const getCampaignById = async (campaignId) => {
    const contract = await getContract();
    
    try {
        const id = BigInt(campaignId); 
        
        const campaign = await contract.showCampaign(id);
        // Fetching contract functions on-chain
        console.log("Campaign Data from Contract:", campaign);

        return {  
            goal: ethers.formatEther(campaign.goal),
            creator: campaign.creator,
            balance: ethers.formatEther(campaign.balance),
            isActive: campaign.isActive,
            deadline: campaign.duration,
        };
        // Return struct campaign's values
    } catch (error) {
        console.error("Error fetching campaign:", error);
        throw new Error("ID invalide ou erreur du contrat.");
        // Error gestion, 
    }
};
```

## Frontend

```typescript
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

```