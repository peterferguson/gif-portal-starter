/*
 * Let's define this method so our code doesn't break.
 * We will write the logic for this next!
 */
export const connectWallet = async () => {
  const { solana } = window

  if (solana) {
    const response = await solana.connect()
    if (response.error) console.log(response.error)
    return response
  }
}
