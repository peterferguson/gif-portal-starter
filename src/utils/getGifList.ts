import { Idl, Program } from "@project-serum/anchor"
import React from "react"
import idl from "../idl.json"
import { getProvider } from "../utils/getProvider"
import { baseAccount, programId } from "../constants"

export const getGifList = async (
  setGifList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    const provider = getProvider()
    const program = new Program(idl as Idl, programId, provider)
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey)

    console.log("Got the account", account)
    setGifList(account.gifList)
  } catch (error) {
    console.log("Error in getGifList: ", error)
    setGifList([])
  }
}
