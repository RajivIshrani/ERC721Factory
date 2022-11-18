const { ethers } = require("hardhat")
const abi = require("../artifacts/contracts/MintAndStorage/ERC721Factory.sol/ERC721Factory.json")

const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
)
console.log(provider)

const abicoder = new ethers.utils.AbiCoder()

const main = async () => {
    const [account1, account2] = await ethers.getSigners()
    const bal = await account1.getBalance()
    
    console.log(account1.getBalance)
    // Creating Instance of ERC721Factory

    console.log("\n---------- Creating Instance of ERC721Factory ----------\n")
    const ERC721Factory = await ethers.getContractFactory("ERC721Factory")
    const erc721FactoryInstance = await ERC721Factory.deploy()
    await erc721FactoryInstance.deployed()

    contractAddress = erc721FactoryInstance.address
    console.log(`\nERC721Factory Address --> ${contractAddress}\n`)

    // encoding function here
    let interface = new ethers.utils.Interface(abi.abi)
    const dataEncode = interface.encodeFunctionData("deployNFTContract", ["TOKEN", 'TKN'])

    const nonce = await provider.getTransactionCount(account1.address)
    console.log(nonce)
    const tx = {
        nonce: nonce,
        from: account1.address,
        to: erc721FactoryInstance.address,
        data: dataEncode,
        // gasLimit: "25000",
        // gasPrice: "10000000"
    }
    console.log(tx)


    const sendTx = await account1.sendTransaction(tx)
    console.log(sendTx)
    const sendTxReceipt = await sendTx.wait()
    console.log(sendTxReceipt)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
