const anchor = require("@project-serum/anchor")

// const { SystemProgram } = anchor.web3

const main = async () => {
  console.log("🚀 Starting test...")

  // - gets data from `solana config get`
  const provider = anchor.Provider.env()
  anchor.setProvider(provider)

  // - compile and deploy the lib.rs file on a local validator
  // ! This requires the correct folder structure `programs/myepicproject/src/lib.rs`
  const program = anchor.workspace.Myepicproject

  // // - Create an account for the program to use
  // const baseAccount = anchor.web3.Keypair.generate()

  // // - mine the instruction `startStuffOff` on the local validator
  // // - passing the account as the context
  // const tx = await program.rpc.startStuffOff({
  //   accounts: {
  //     baseAccount: baseAccount.publicKey,
  //     user: provider.wallet.publicKey,
  //     systemProgram: SystemProgram.programId,
  //   },
  //   signers: [baseAccount],
  // })

  // // - wait for the transaction to be mined
  const tx = await program.rpc.startStuffOff()

  console.log("📝 Your transaction signature", tx)

  // // - Fetch data from the account.
  // let account = await program.account.baseAccount.fetch(baseAccount.publicKey)
  // console.log("👀 GIF Count", account.totalGifs.toString())
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain()
