const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
const abi = require("../artifacts/contracts/MintAndStorage/ERC721Factory.sol/ERC721Factory.json")

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL)
const address = "0xcbA8FB88FDBE736b8540eE5992978762cb38Ff4C" // Factory address

const contract = new ethers.Contract(address, abi.abi, provider)

let account, account2, nftContract

describe("ERC721Factory", () => {
    beforeEach(async () => {
        ;[account, account2] = await ethers.getSigners()
    })

    it("Should mint NFT Contract", async () => {
        let newContract = await contract
            .connect(account)
            .deployNFTContract("Backy", "BAK")
        const txReceipt = await newContract.wait()

        console.log(txReceipt)

        nftContract = txReceipt.events[0].args.nftContract
        console.log(`\nDeployed NFT Contract Address --> ${nftContract}`)
    })

    it("Should mint NFT for a contract", async () => {
        let newNFT = await contract
            .connect(account)
            .mintNFT(
                nftContract,
                "https://gateway.pinata.cloud/ipfs/QmYJ8A4js3Pcqgp3HkCeoj2BUuen5tD7o8Z4R2k46eLM8b"
            )

        const txReceipt1 = await newNFT.wait()
        console.log(txReceipt1)
    })
})

