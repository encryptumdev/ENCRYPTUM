const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MCP Contract", function () {
  let MCP, mcp, owner;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    MCP = await ethers.getContractFactory("MCP");
    mcp = await MCP.deploy();
    await mcp.deployed();
  });

  it("Should deploy and set owner", async () => {
    expect(await mcp.getMemory("testAgent")).to.equal("");
  });

  it("Should update and get memory", async () => {
    await mcp.updateMemory("agent1", "QmTestCID123");
    const cid = await mcp.getMemory("agent1");
    expect(cid).to.equal("QmTestCID123");
  });
});
