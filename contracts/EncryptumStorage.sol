// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract EncryptumStorage {
    struct File {
        address owner;
        string encryptedCID;
        string fileName;
        uint256 timestamp;
    }

    mapping(uint256 => File) private files;
    uint256 public fileCount;

    event FileUploaded(uint256 fileId, address indexed owner, string encryptedCID, string fileName);

    function uploadFile(string memory _encryptedCID, string memory _fileName) external {
        fileCount++;
        files[fileCount] = File(msg.sender, _encryptedCID, _fileName, block.timestamp);
        emit FileUploaded(fileCount, msg.sender, _encryptedCID, _fileName);
    }

    function getFile(uint256 _fileId) external view returns (File memory) {
        require(_fileId > 0 && _fileId <= fileCount, "File does not exist");
        return files[_fileId];
    }
}
