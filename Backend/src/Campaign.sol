// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract CampaignFunds {

     address public owner;
     uint256 public nextOrderId;
     uint256 public orderId;


    mapping(uint256 => Campaign) public campaigns;

    event CampaignCreated(uint256 id, string goal);
    event ContributionReceived(uint256 id, address donor, uint256 amount);


    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Not the owner");
       _; 
    }
 
    struct Campaign {
        string goal;
        address creator;
        uint256 balance;
        bool isActive;
    }

    struct Contributor {
        uint256 amount;
    }

    function createCampaign(string memory _goal) external returns (uint256){

        uint256 Id = nextOrderId++;
        campaigns[Id] = (Campaign({
            goal: _goal,
            creator: msg.sender,
            balance: 0,
            isActive: true
        }));
        emit CampaignCreated(Id, _goal);
        return Id;
    }

    function applyContribution(uint _Id) external payable{
        require(msg.value > 0, "You must send a positive amount");
        require(campaigns[_Id].isActive, "Campaign no longer Active");
        require(campaigns[_Id].creator != address(0), "Campaign does not exist");

        campaigns[_Id].balance += msg.value;
        emit ContributionReceived(_Id, msg.sender, msg.value);
    }

    function endCampaign(uint _Id) external onlyOwner{
        require(campaigns[_Id].isActive, "No longer active");
        campaigns[_Id].isActive = false;
    }

    function showCampaign(uint _Id) public view returns (Campaign memory) {
        return campaigns[_Id];
    }

    function withdraw(uint256 _id) external {
    require(msg.sender == campaigns[_id].creator, "Not the creator");
    uint256 amount = campaigns[_id].balance; 
    campaigns[_id].balance = 0; // Avoid reentrancy 
    payable(msg.sender).transfer(amount);
}

    
}