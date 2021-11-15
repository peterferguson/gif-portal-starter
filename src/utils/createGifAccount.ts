import { Idl, Program } from "@project-serum/anchor"
import { SystemProgram } from "@solana/web3.js"
import React from "react"
import idl from "../idl.json"
import { getProvider } from "../utils/getProvider"
import { getGifList } from "./getGifList"

import { baseAccount, programId } from "../constants"

export const createGifAccount = async (
  setGifList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    const provider = getProvider()
    const program = new Program(idl as Idl, programId, provider)
    console.log(
      "Creating a new BaseAccount w/ address:",
      baseAccount.publicKey.toString()
    )
  await program.rpc.startStuffOff({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    })
    console.log(
      "Created a new BaseAccount w/ address:",
      baseAccount.publicKey.toString()
    )
    await getGifList(setGifList)
  } catch (error) {
    console.log("Error creating BaseAccount account:", error)
  }
}
