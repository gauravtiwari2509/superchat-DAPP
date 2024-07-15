const hre = require("hardhat");
async function main() {

    const superchatContract = await hre.ethers.deployContract("Superchat");
    await superchatContract.waitForDeployment();
    console.log("Address of contract:", superchatContract.target);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
