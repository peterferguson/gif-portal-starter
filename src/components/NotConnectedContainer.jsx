import { connectWallet } from "../utils/connectWallet"

/*
 * We want to render this UI when the user hasn't connected
 * their wallet to our app yet.
 */
export const NotConnectedContainer = () => (
  <button className="cta-button connect-wallet-button" onClick={connectWallet}>
    Connect to Wallet
  </button>
)
