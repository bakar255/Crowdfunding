// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/Campaign.sol"; 

contract DeployCampaign is Script {
    function run() external {
        vm.startBroadcast();

        CampaignFunds campaign = new CampaignFunds();

        console2.log("Deployed:", address(campaign));
        vm.stopBroadcast();
    }
}