async function main() {
  const Encryptum = await ethers.getContractFactory("EncryptumStorage");
  const encryptum = await Encryptum.deploy();
  await encryptum.deployed();
  console.log("Encryptum deployed to:", encryptum.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
