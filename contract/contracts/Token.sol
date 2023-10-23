// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";


contract Token {
    address public owner;
    string public name;
    string public symble;
    uint256 public totalSupply;
    
    mapping (address => uint256) public balance;


    constructor (string memory _tokenName, string memory _tokenSymble, uint256 _totalSupply) {
        owner = msg.sender;
        name = _tokenName;
        symble = _tokenSymble;
        totalSupply = _totalSupply;
        balance[msg.sender] = totalSupply;
    }

    // Events
    event Transfered(address indexed form, address indexed to, uint256 amount);


    // Get Name
    function getName () external view returns (string memory) {
        return name;
    }

    // Get Symble
    function getSymble () external view returns (string memory) {
        return symble;
    }

    // Transfer Token
    function transfer (address _to, uint256 _amount) external {
        require(balance[msg.sender] >= _amount, "Not enough tokens");
        
        balance[msg.sender] -= _amount;
        balance[_to] += _amount;

        emit Transfered(msg.sender, _to, _amount);
        console.log("Account %s transfered %s tokens to account %s", msg.sender, _amount, _to);
    }

    // Get BalanceOf an Specific Account
    function balanceOf (address _address) external view returns (uint256) {
        return balance[_address];
    }
}