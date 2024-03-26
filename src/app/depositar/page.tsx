'use client'

import AuthenticatedPage from '@/components/layout/authenticatedPage'
import { links } from '@/lib/links'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useState } from 'react'
import { createWalletClient, custom, parseEther } from 'viem'
import { baseSepolia } from 'viem/chains'

const LoadAssets = () => {
  const { connectWallet } = usePrivy()
  const { wallets } = useWallets()
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy')
  const externalWallet = wallets.find((wallet) => wallet.walletClientType !== 'privy')
  const [txIsLoading, setTxIsLoading] = useState(false)
  const [txHash, setTxHash] = useState<string | undefined>()

  const onTransfer = async () => {
    if (!externalWallet || !embeddedWallet) return
    try {
      // Switch chain to Base Sepolia
      await externalWallet.switchChain(baseSepolia.id)

      // Build viem wallet client for external wallet
      const provider = await externalWallet.getEthereumProvider()
      const walletClient = createWalletClient({
        account: externalWallet.address as `0x${string}`,
        chain: baseSepolia,
        transport: custom(provider),
      })

      // Send transaction from external wallet
      setTxIsLoading(true)
      const _txHash = await walletClient.sendTransaction({
        account: externalWallet.address as `0x${string}`,
        to: embeddedWallet.address as `0x${string}`,
        value: parseEther('0.005'),
      })
      setTxHash(_txHash)
    } catch (e) {
      console.error('Transfer failed with error ', e)
    }
    setTxIsLoading(false)
  }

  const onAddNetwork = async () => {
    if (!externalWallet) return
    const provider = await externalWallet.getEthereumProvider()
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `0x${baseSepolia.id.toString(16)}`,
          chainName: baseSepolia.name,
          nativeCurrency: baseSepolia.nativeCurrency,
          rpcUrls: [baseSepolia.rpcUrls.default.http[0] ?? ''],
          blockExplorerUrls: [baseSepolia.blockExplorers?.default.url ?? ''],
        },
      ],
    })
  }

  return (
    <AuthenticatedPage className="text-center">
      <div className="max-w-xs md:max-w-sm">
        <p className="text-md mt-2 font-bold text-gray-700">deposita fondos a tu cartera</p>
        <p className="mt-2 text-sm text-gray-600">
          conecta una cartera externa para enviar activos a tu cartera de aplicación. la cartera
          externa debe tener soporte a la red de prueba Base Sepolia.
        </p>
        <p className="mt-2 text-sm text-gray-600"></p>
        <button
          type="button"
          className="mt-2 w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm disabled:bg-indigo-400"
          onClick={connectWallet}
        >
          {!externalWallet ? 'conectar cartera' : 'usar otra cartera'}
        </button>
        <textarea
          value={
            externalWallet
              ? JSON.stringify(externalWallet, null, 2)
              : 'No external wallet connected'
          }
          className="mt-4 h-fit w-full rounded-md bg-slate-700 p-4 font-mono text-xs text-slate-50"
          rows={9}
          readOnly
        />
        <p className="mt-2 text-sm text-gray-600">agrega la red Base Sepolia a tu cartera</p>
        <button
          type="button"
          className="mt-2 w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm disabled:bg-indigo-400"
          onClick={onAddNetwork}
          disabled={!externalWallet}
        >
          agregar red Base Sepolia
        </button>
        <p className="mt-2 text-sm text-gray-600">
          presiona el botón de abajo para depositar 0.005 Sepolia ETH a tu cartera de aplicación
        </p>
        <button
          type="button"
          className="mt-2 w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm disabled:bg-indigo-400"
          onClick={onTransfer}
          disabled={!externalWallet || txIsLoading}
        >
          depositar 0.005 ETH
        </button>
        {txHash && (
          <p className="mt-2 text-sm italic text-gray-600">
            See your transaction on{' '}
            <a
              className="underline"
              href={`${links.baseSepolia.transactionExplorer}${txHash}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              etherscan
            </a>
            .
          </p>
        )}
      </div>
    </AuthenticatedPage>
  )
}

export default LoadAssets
