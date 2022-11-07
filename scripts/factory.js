const { ethers } = require("ethers")
const abi = require("../artifacts/contracts/MintAndStorage/ERC721Factory.sol/ERC721Factory.json")

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL)
const address = "0xcbA8FB88FDBE736b8540eE5992978762cb38Ff4C" // Factory address

const contract = new ethers.Contract(address, abi, provider)

const main = async () => {
    // calling deployNFTContract function
    console.log("---------- calling deployNFTContract function  ----------")
    const [account, account2] = await ethers.getSigners()

    let newContract = await contract.deployNFTContract("Rajiv", "Raj")
    const txReceipt = await newContract.wait()
    console.log(`Tx Receipt --> ${txReceipt}`)
    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
