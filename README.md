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