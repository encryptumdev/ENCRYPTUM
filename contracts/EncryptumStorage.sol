// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract EncryptumStorage {
    struct File {
        string cid;
        string fileName;
        uint256 timestamp;
        address owner;
    }

    mapping(address => File[]) public files;

    event FileUploaded(address indexed user, string cid, string fileName, uint256 timestamp);

    function uploadFile(string memory _cid, string memory _fileName) public {
        File memory newFile = File(_cid, _fileName, block.timestamp, msg.sender);
        files[msg.sender].push(newFile);
        emit FileUploaded(msg.sender, _cid, _fileName, block.timestamp);
    }

    function getMyFiles() public view returns (File[] memory) {
        return files[msg.sender];
    }
}
