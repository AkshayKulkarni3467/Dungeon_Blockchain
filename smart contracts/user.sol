// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract App {
    struct User{
        address owner;
        string name;
        uint256 likeCount;
        uint256 dislikeCount;
        string[] posts;
        uint256[] postlikes; 
        uint256[] postIds;
        uint postCount;
        uint256 rewards;
        address[] giftaddresses;
    }

    mapping(uint256 => User) public users;

    uint256 public noOfUsers = 0;

    function createUser(string memory _name)public returns(uint256){
        User storage user = users[noOfUsers];
        user.name = _name;
        user.owner = msg.sender;
        user.likeCount = 1;
        user.dislikeCount = 0;
        user.postCount = 0;
        user.rewards = 0;
        noOfUsers++;
        return noOfUsers - 1;
    }
    function pushUserPost(uint256 _id,string memory _value) public returns (uint256){
        User storage user = users[_id];
        user.posts.push(_value);
        user.postlikes.push(user.likeCount-user.dislikeCount);
        user.postIds.push(user.postCount);
        user.postCount++;
        return user.postCount - 1;
    }
    function getUserPosts(uint256 _id) public view returns (string[] memory){
        User storage user = users[_id];
        string[] memory ret = new string[](user.postCount);
        for (uint i = 0; i < user.postCount; i++) {
            ret[i] = user.posts[i];
        }
        return ret;
    }
    function getUserInfo(uint256 _id)public view returns (string memory,address _owner,uint256 _likeCount, uint256 _dislikeCount,uint256 rewards){
        User storage user = users[_id];
        return (user.name,user.owner,user.likeCount,user.dislikeCount,user.rewards);
    }
    function getAllUsers()public view returns (User[] memory){
        User[] memory allUsers = new User[](noOfUsers);
        for(uint i = 0;i<noOfUsers;i++){
            User storage user = users[i];
            allUsers[i] = user;
        }
        return allUsers;
    }
    function setLikes(uint256 _userid,uint256 _postid)public {
        User storage user = users[_userid];
        user.postlikes[user.postIds[_postid]]+=1;
        user.likeCount+=1;
    }
    function setdisLikes(uint256 _userid,uint256 _postid)public {
        User storage user = users[_userid];
        user.postlikes[user.postIds[_postid]]-=1;
        user.dislikeCount+=1;
    }
    function giveGift(uint256 _id)public payable{
        User storage user = users[_id];
        user.rewards += msg.value;
        user.giftaddresses.push(msg.sender);
    }
    
}