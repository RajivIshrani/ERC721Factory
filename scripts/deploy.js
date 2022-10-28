const hre = require("hardhat")

async function main() {
    const Factory = await hre.ethers.getContractFactory("Factory")
    const factoryInstance = await Factory.deploy()
    await factoryInstance.deployed()
    console.log(factoryInstance)
    console.log("--------------------Deployed--------------------")
    console.log("Factory Address: ", factoryInstance.address)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
