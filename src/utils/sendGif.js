import { Program } from "@project-serum/anchor"
import { baseAccount, programId } from "../constants"
import idl from "../idl.json"
import { getProvider } from "../utils/getProvider"
import { getGifList } from "../utils/getGifList"

export const sendGif = async (inputValue, setGifList) => {
  if (inputValue.length === 0) {
    console.log("No gif link given!")
    return
  }
  console.log("Gif link:", inputValue)
  try {
    const provider = getProvider()
    const program = new Program(idl, programId, provider)

    await program.rpc.addGif(inputValue, {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    })
    console.log("GIF successfully sent to program", inputValue)

    await getGifList(setGifList)
  } catch (error) {
    console.log("Error sending GIF:", error)
  }
}
