//SPDX-Licence-Identifer: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/Campaign.sol";

contract CampaignFundsTest is Test {

    CampaignFunds public campaignFunds; 
    address owner = makeAddr("owner");
    address user1 = makeAddr("user1");
    address donor = makeAddr("donor");


    function setUp() public {
        vm.prank(owner);
        campaignFunds = new CampaignFunds();
        vm.deal(donor, 5 ether);
    }

    function testGetCampaign() public {
        vm.prank(donor);

       uint256 id; 
       id = campaignFunds.createCampaign("Gaza Fundation");
        
        CampaignFunds.Campaign memory campaign = campaignFunds.showCampaign(0);
        assertEq(campaign.goal, "Gaza Fundation");
        assertEq(campaign.isActive, true);
        assertEq(campaign.balance, 0);

         CampaignFunds.Campaign memory c = campaignFunds.showCampaign(id);
         assertEq(c.creator, donor, "Creator mismatch");

    }

    function testContribution() public {
     vm.prank(donor);
     campaignFunds.applyContribution{value: 0.5 ether}(0);
    }


}

