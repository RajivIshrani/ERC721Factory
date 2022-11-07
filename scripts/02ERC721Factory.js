const { ethers } = require("hardhat")
const abi = require("../artifacts/contracts/MintAndStorage/ERC721Factory.sol/ERC721Factory.json")

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL)
const address = "0xcbA8FB88FDBE736b8540eE5992978762cb38Ff4C" // Factory address

const contract = new ethers.Contract(address, abi.abi, provider)

const main = async () => {
    const [account, account2] = await ethers.getSigners()
    // calling deployNFTContract function
    console.log("\n---------- calling deployNFTContract function  ----------\n")

    let newContract = await contract
        .connect(account)
        .deployNFTContract("Rajiv", "Raj")
    const txReceipt = await newContract.wait()

    console.log(txReceipt)

    const nftContract = txReceipt.events[0].args.nftContract
    console.log(`\nDeployed NFT Contract Address --> ${nftContract}`)

    // calling mintNFT function
    console.log("\n---------- calling mintNFT function ----------\n")

    let newNFT = await contract
        .connect(account)
        .mintNFT(nftContract, "ipfs://xxxxxxxxxxxxxxxxxxxxxxxxxxxxx/")

    const txReceipt1 = await newNFT.wait()
    console.log(txReceipt1)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
