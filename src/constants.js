import { clusterApiUrl, PublicKey, Keypair } from "@solana/web3.js"
import idl from "./idl.json"
import kp from "./keypair.json"

// Constant s
export const TWITTER_HANDLE = "_buildspace"
export const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`

export const network = clusterApiUrl("devnet")
// - this allows us to control how long we wait for confirmation of the tx
// - more info here (https://solana-labs.github.io/solana-web3.js/modules.html#Commitment)
// - `processed` simply waits until the node we are connected to has confirmed the tx
export const opts = {
  preflightCommitment: "processed",
}

export const TEST_GIFS = [
  "https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp",
  "https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g",
]

export const programId = new PublicKey(idl.metadata.address)

const arr = Object.values(kp._keypair.secretKey)
const secret = new Uint8Array(arr)
export const baseAccount = Keypair.fromSecretKey(secret)
