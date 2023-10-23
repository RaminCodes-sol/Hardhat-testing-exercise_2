const hre = require("hardhat");



async function main() {
  const token = await hre.ethers.deployContract("Token", ["TickoTick", "TOT", 1000])
  await token.waitForDeployment()
  
  const name = await token.name()
  const symble = await token.symble()
  const totalSupply = await token.totalSupply()

  console.log(
    `token deployed to: ${token.target}`
  );

  console.log({'Token Name': name, 'Token Symble': symble, 'Token TotalSupply': parseInt(totalSupply)})
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
