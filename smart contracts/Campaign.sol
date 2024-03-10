// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public noOfCampaigns = 0;
    function createCampaign(address _owner,string memory _title, string memory _description, uint256 _target, uint256 _deadline)public returns (uint256){
        Campaign storage campaign = campaigns[noOfCampaigns];
        require(campaign.deadline < block.timestamp, "The deadline should be a date in future");
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        
        noOfCampaigns++;
        return noOfCampaigns-1;
    }
    
    function donateToCampaign(uint256 _id,uint256 _value)public payable {
        uint256 amount = _value;
        Campaign storage campaign = campaigns[_id];
            campaign.donators.push(msg.sender);
            campaign.donations.push(amount);
            campaign.amountCollected+=amount;
    }

    function getDonators(uint256 _id)view public returns (address[] memory,uint256[] memory){
        return (campaigns[_id].donators,campaigns[_id].donations);
    }

    function getCampaigns()public view returns (Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](noOfCampaigns);
        for (uint i = 0;i<noOfCampaigns;i++){
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}