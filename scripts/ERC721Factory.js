const { ethers } = require("hardhat")
const { except, assert } = require("chai")

async function main() {
    // Creating Instance of ERC721Factory
    let _nftContract
    let account
    // let address1, address2, owner, signer1, signer2

    console.log("---------- Creating Instance of ERC721Factory ----------")
    const ERC721Factory = await ethers.getContractFactory("ERC721Factory")
    const erc721FactoryInstance = await ERC721Factory.deploy()
    await erc721FactoryInstance.deployed()

    contractAddress = erc721FactoryInstance.address
    console.log("ERC721Factory Address", contractAddress)

    let _name = "Rajiv"
    let _symbol = "Raj"

    // mint function
    console.log("---------- calling deployNFTContract function  ----------")
    // let addreses = await ethers.getSigners()
    // console.log(addreses)
    const [owner, signer1, signer2] = await ethers.getSigners()
    let nftAddress = await erc721FactoryInstance.deployNFTContract(
        _name,
        _symbol
    )
    const txReceipt1 = await nftAddress.wait()
    console.log(txReceipt1)
    // console.log(nftContractAddress)
    console.log("Name of the NFT: ", _name)
    console.log("Symbol of the NFT: ", _symbol)

    // deployNFTContract
    console.log("---------- mint an NFT for a contract ----------")

    let newNFT = await erc721FactoryInstance
        .connect(signer1)
        .mintNFT(_nftContract, "ipfs://xxxxxxxxxxxxxxxxxxxxxxxxxxxxx/")

    const txReceipt = await newNFT.wait()
    console.log(txReceipt)

    //List list NFT collection for owner
    // let totalCollections = await erc721FactoryInstance.listNFTsForOwner(
    //     account1
    // )
    // await totalCollections.wait()
    // console.log("NFT Collection: ", totalCollections)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
