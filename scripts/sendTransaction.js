const { ethers } = require("hardhat")

const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545/%22"
)

const main = async () => {
    const [account1, account2] = await ethers.getSigners()

    const balanceBefore1 = await provider.getBalance(account1.address)
    const balanceBefore2 = await provider.getBalance(account2.address)

    console.log(`Before Tx account1 Bal --> ${balanceBefore1}`)
    console.log(`Before Tx account2 Bal --> ${balanceBefore2}`)

    const tx = await account2.sendTransaction({
        to: account1.address,
        value: ethers.utils.parseEther("1"),
    })
    const txReceipt = await tx.wait()

    console.log(txReceipt)

    const balanceAfter1 = await provider.getBalance(account1.address)
    const balanceAfter2 = await provider.getBalance(account2.address)

    console.log(`After Tx account1 Bal --> ${balanceAfter1}`)
    console.log(`After Tx account2 Bal --> ${balanceAfter2}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
