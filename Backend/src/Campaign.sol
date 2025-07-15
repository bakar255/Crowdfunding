// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

///@author bakar255
//@title CampaignFunds - A decentralized crowdfunding contract
//@notice  This contract allows users to create and contribute to crowdfunding campaigns.

contract CampaignFunds {
    address public owner; // Owner of the contract 
    uint256 public nextOrderId; // Next ID to be assigned to the campaings
    uint256 public immutable MAX_DEADLINE_DURATION = 3 days; // Maximum duration allowed for one campaign 

    struct Campaign {
        string goal; /// @notice The fundraising goal
        address creator; //  The address that created the campaing(msg.sender)
        uint256 balance; // Current balance of the contract
        bool isActive; // Status of the campaign
        uint deadlineDuration; // Timestamp of the duration and deadline of the campaing
    }


    mapping(uint256 => Campaign) public campaigns; // ID => Campaigns 
     
    // -- Event -- 
    event CampaignCreated(uint256 id, string goal);
    event ContributionReceived(uint256 id, address donor, uint256 amount);
    event CampaignEnded(uint256 id);
 
    // -- Error -- 
    error CampaignInactive();
    error InvalidAmount();
    error InvalidDeadline();
    error InvalidCreator();
    error InvalidDuration(uint256 provided, uint256 maxAllowed);
    error Unauthorized();

    constructor() {
        owner = msg.sender;
    }

    function createCampaign(string memory _goal, uint _deadlineDuration) external returns (uint256) {
        if(_deadlineDuration == 0 || _deadlineDuration > MAX_DEADLINE_DURATION) {
            revert InvalidDuration(_deadlineDuration, MAX_DEADLINE_DURATION);
        }

        uint256 Id = nextOrderId++;
        uint256 deadline = block.timestamp + _deadlineDuration; 

        campaigns[Id] = Campaign({
            goal: _goal,
            creator: msg.sender,
            balance: 0,
            isActive: true,
            deadlineDuration: deadline
        });

        emit CampaignCreated(Id, _goal);
        return Id;
        //@return Id campaigns and return the event.
    }
    
    /// @notice permit users to contribute to which camapigns they want to, 
    /// user has to enter the ID, and enter the amount.

    function applyContribution(uint _Id) external payable {
        Campaign storage campaign = campaigns[_Id];
        
        if(msg.value == 0) revert InvalidAmount();
        if(!campaign.isActive) revert CampaignInactive();
        if(campaign.creator == address(0)) revert InvalidCreator();
        if(block.timestamp > campaign.deadlineDuration) revert InvalidDeadline();

        campaign.balance += msg.value;
        emit ContributionReceived(_Id, msg.sender, msg.value);
    }


    /// @notice Ends a specific campaign and marks it as inactive
    /// @dev Only the contract owner can call this function or owner contract

    function endCampaign(uint _Id) external {
        Campaign storage campaign = campaigns[_Id];
        
        if(msg.sender != campaign.creator && msg.sender != owner) revert Unauthorized();
        if(!campaign.isActive) revert CampaignInactive();
        
        campaign.isActive = false;
        emit CampaignEnded(_Id);
    }

    function showCampaign(uint _Id) public view returns (Campaign memory) {
        return campaigns[_Id];
    }

    /// @notice Withdraw amount the campaing and sends them to the user
    function withdraw(uint256 _id) external {
        Campaign storage campaign = campaigns[_id];
        require(msg.sender == campaign.creator, "Not the creator");
        require(!campaign.isActive, "Campaign still active");
        
        uint256 amount = campaign.balance;
        campaign.balance = 0;
        payable(msg.sender).transfer(amount);
    }
}