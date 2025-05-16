// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MCP {
    // Mapping agent ID => IPFS CID string
    mapping(string => string) private agentMemories;

    // Event emitted when memory updated
    event MemoryUpdated(string agentId, string cid);

    // Update the memory CID for an agent
    function updateMemory(string calldata agentId, string calldata cid) external {
        agentMemories[agentId] = cid;
        emit MemoryUpdated(agentId, cid);
    }

    // Read the current memory CID of an agent
    function getMemory(string calldata agentId) external view returns (string memory) {
        return agentMemories[agentId];
    }
}
