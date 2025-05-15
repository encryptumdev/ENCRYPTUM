const hre = require("hardhat");

async function main() {
  const EncryptumStorage = await hre.ethers.getContractFactory("EncryptumStorage");
  const contract = await EncryptumStorage.deploy();
  await contract.deployed();

  console.log(`EncryptumStorage deployed to: ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
