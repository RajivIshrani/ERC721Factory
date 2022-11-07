const { ethers } = require("hardhat")
const abi = require("../artifacts/contracts/MintAndStorage/ERC721Factory.sol/ERC721Factory.json")
async function main() {
    let _name = "Rajiv"
    let _symbol = "Raj"

    // Creating Instance of ERC721Factory

    console.log("\n---------- Creating Instance of ERC721Factory ----------\n")
    const ERC721Factory = await ethers.getContractFactory("ERC721Factory")
    const erc721FactoryInstance = await ERC721Factory.deploy()
    await erc721FactoryInstance.deployed()

    contractAddress = erc721FactoryInstance.address
    console.log("ERC721Factory Address", contractAddress)

    // calling deployNFTContract function

    console.log("\n---------- calling deployNFTContract function  ----------\n")
    const [owner, signer1, signer2] = await ethers.getSigners()
    let nftAddress = await erc721FactoryInstance.deployNFTContract(
        _name,
        _symbol
    )
    const txReceipt = await nftAddress.wait()
    console.log(txReceipt)

    const nftContract = txReceipt.events[0].address

    console.log("\nDeployed NFT Contract Address\n", nftContract)

    // calling mintNFT function
    // address = txReceipt.from
    // console.log(address)

    console.log("\n---------- calling mintNFT function ----------\n")
    let newNFT = await erc721FactoryInstance
        .connect()
        .mintNFT(nftContract, "ipfs://xxxxxxxxxxxxxxxxxxxxxxxxxxxxx/")

    const txReceipt1 = await newNFT.wait()
    console.log(txReceipt1)

    // list NFT collection for owner
    // console.log("---------- list NFT collection for owner ----------")
    // let listNFT = await erc721FactoryInstance.listNFTsForOwner(signer1)

    // const txReceipt2 = await listNFT.wait()
    // console.log(txReceipt2)
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
