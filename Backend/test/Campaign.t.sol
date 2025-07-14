//SPDX-Licence-Identifer: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/Campaign.sol";

contract CampaignFundsTest is Test {

    CampaignFunds public campaignFunds; 
    address public owner = address(0x1);
    address public user1= address(0x2);
    address public user2 = address(0x3);

    function setUp() public {
        vm.prank(owner);
        campaignFunds = new CampaignFunds();
    }

    function testGetCampaign() public {
        vm.prank(user1);
        campaignFunds.CreateCampaign("Test Goal");
        
        CampaignFunds.Campaign memory campaign = campaignFunds.seeCampaign(0);
        assertEq(campaign.goal, "Test Goal");
        assertEq(campaign.isActive, true);
        assertEq(campaign.balance, 0);
        assertEq(campaign.creator, msg.sender);
    }

    function testContribution() public {
     vm.prank(user1);
     campaignFunds.applyContribution(0);


    }


}

