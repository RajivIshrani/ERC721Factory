const hre = require("hardhat")

async function main() {
    const ERC721Factory = await hre.ethers.getContractFactory("ERC721Factory")
    const erc21FactoryInstance = await ERC721Factory.deploy()
    await erc21FactoryInstance.deployed()
    console.log(erc21FactoryInstance)
    console.log("\n--------------------Deployed--------------------\n")
    const txHash = await erc21FactoryInstance.deployTransaction.hash
    console.log(`TxHash --> ${txHash}\n`)

    const from = await erc21FactoryInstance.deployTransaction.from
    console.log(`From --> ${from}\n`)

    console.log(`Factory Address --> ${erc21FactoryInstance.address}`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
