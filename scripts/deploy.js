const hre = require("hardhat")

async function main() {
    const ERC721Factory = await hre.ethers.getContractFactory("ERC721Factory")
    const erc21FactoryInstance = await ERC721Factory.deploy()
    await erc21FactoryInstance.deployed()
    console.log(erc21FactoryInstance)
    console.log("--------------------Deployed--------------------")
    console.log("Factory Address: ", erc21FactoryInstance.address)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
