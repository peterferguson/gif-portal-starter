import { Provider } from "@project-serum/anchor"
import { Connection } from "@solana/web3.js"
import { network, opts } from "../constants"

export const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment)
  const provider = new Provider(connection, window.solana, opts.preflightCommitment)
  return provider
}
