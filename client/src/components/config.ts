import { createPublicClient, createWalletClient, custom, http} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { morphHolesky } from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: morphHolesky,
  transport: http()
})
 
export const walletClient = createWalletClient({
  chain: morphHolesky,
  transport: custom(window.ethereum)
})
 
// JSON-RPC Account
// export const [account] = await walletClient.getAddresses()

// Local Account
export const account = privateKeyToAccount('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e')