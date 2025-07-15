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
       id = campaignFunds.createCampaign("Gaza Fundation", 3);
        
        CampaignFunds.Campaign memory campaign = campaignFunds.showCampaign(0);
        assertEq(campaign.goal, "Gaza Fundation");
        assertEq(campaign.isActive, true);
        assertEq(campaign.balance, 0);

         CampaignFunds.Campaign memory c = campaignFunds.showCampaign(id);
         assertEq(c.creator, donor, "Creator mismatch");

    }

        function testApplyContribution() public {
        // Create Campaign
        vm.prank(owner);
        campaignFunds.createCampaign("Raising for kids with cancers", 5);
            // Contribute to campaign
        vm.prank(donor);
        vm.deal(donor, 5 ether);
        campaignFunds.applyContribution{value: 3 ether}(0);

        // Verify assert 
        CampaignFunds.Campaign memory camp = campaignFunds.showCampaign(0);
        assertEq(address(campaignFunds).balance, 3 ether);
        assertEq(camp.balance, 3 ether);
        assertEq(camp.creator, camp.creator);
        }

        function test_Wrap() public {
            vm.prank(user1);
            uint256 id = campaignFunds.createCampaign("Help people in Austria", 2); // User choose 2 days
 
            vm.warp(block.timestamp + 3 days); // Increase to 3 days

            vm.expectRevert("Campaign expired");
            campaignFunds.applyContribution {value: 1 ether}(id); // Try Contribute to the project

        }


        function testWithdraw() public {
            
          vm.prank(user1);
          uint256 id = campaignFunds.createCampaign("Help Women alone in the world", 3 );  // Create Simple Campaign
          
          // Donate 1 ether to the campaign
          vm.prank(donor);
          vm.deal(donor, 5 ether);
          campaignFunds.applyContribution{value: 1 ether}(id);
         // User1 end campaing
          vm.prank(user1);
          campaignFunds.endCampaign(id);
          // User1 claim balances's campaign
          vm.prank(user1);
          campaignFunds.withdraw(id);
          // Verify
          assertEq(user1.balance, 1 ether ); // User1 has 1 ether 
          assertEq(campaignFunds.showCampaign(id).balance, 0, "Balance has not value anymore"); // Balances has not value.
        }
            


}

