async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);

  const MCP = await ethers.getContractFactory("MCP");
  const mcp = await MCP.deploy();

  await mcp.deployed();

  console.log("MCP deployed to:", mcp.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
