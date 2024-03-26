'use client'

import AuthenticatedPage from '@/components/layout/authenticatedPage'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { ArrowDownToLine, Send } from 'lucide-react'
import { useState } from 'react'
import { createWalletClient, custom, isAddress, parseEther } from 'viem'
import { baseSepolia } from 'viem/chains'
import { useBalance } from 'wagmi'

const EmbeddedWallet = () => {
  const { signMessage, sendTransaction, exportWallet } = usePrivy()
  const { wallets } = useWallets()
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy')

  const [showSendToInput, setShowSendToInput] = useState(false)

  // Signature state
  const [signature, setSignature] = useState<string | undefined>()

  // Transaction state
  const [recipientAddress, setRecipientAddress] = useState<string | undefined>()
  const [ethAmount, setEthAmount] = useState('0.00069')
  const [txHash, setTxHash] = useState<string | undefined>()
  const [txIsLoading, setTxIsLoading] = useState(false)

  const { data: userBalance, error: userBalanceError } = useBalance({
    address: embeddedWallet?.address as `0x${string}`,
  })

  console.log(userBalance)

  const onSign = async () => {
    try {
      const _signature = await signMessage(
        'I logged into the Privy PWA demo and signed this message!',
      )
      setSignature(_signature)
    } catch (e) {
      console.error('Signature failed with error ', e)
    }
  }

  const onTransfer = async () => {
    if (!embeddedWallet) return
    try {
      // Switch network to Base Sepolia
      await embeddedWallet.switchChain(baseSepolia.id)
      // Get an EIP1193 provider from the embedded wallet
      const provider = await embeddedWallet.getEthereumProvider()
      // From the EIP1193 provider, create a viem wallet client
      const walletClient = createWalletClient({
        account: embeddedWallet.address as `0x${string}`,
        chain: baseSepolia,
        transport: custom(provider),
      })

      // Send transaction using the viem wallet client. Alternatively, you
      // may use Privy's `sendTransaction` method. This is just an example
      // of the many ways to send a transaction from the wallet.
      setTxIsLoading(true)
      const _txHash = await walletClient.sendTransaction({
        account: embeddedWallet.address as `0x${string}`,
        to: recipientAddress as `0x${string}`,
        value: parseEther(ethAmount),
      })
      setTxHash(_txHash)
      setEthAmount('0.00')
      setRecipientAddress('')
    } catch (e) {
      console.error('Transfer failed with error ', e)
    }
    setTxIsLoading(false)
  }

  return (
    <AuthenticatedPage className="space-y-6 text-center lg:space-y-4">
      <div className="flex max-w-xs flex-col space-y-4 md:max-w-sm">
        <div className="flex w-full flex-col items-center">
          {userBalance && userBalance.formatted ? (
            <span className="text-3xl font-medium">
              {parseFloat(userBalance.formatted).toFixed(4)} {userBalance.symbol}
            </span>
          ) : (
            <span className="text-lg">cargando...</span>
          )}
          <span className="text-lg">balance</span>
        </div>
        <div className="flex w-full justify-center space-x-4">
          <Button variant="default" size="icon" className="rounded-full">
            <ArrowDownToLine />
          </Button>
          <Button variant="default" size="icon" className="rounded-full">
            <Send className="mr-0.5 mt-0.5" onClick={() => setShowSendToInput(!showSendToInput)} />
          </Button>
        </div>
      </div>
      {/* Transfer ETH / native currency */}
      {showSendToInput && (
        <div className="flex w-full max-w-xs flex-col space-y-2 md:max-w-sm">
          <p className="w-full text-left text-lg font-bold text-gray-700">enviando ETH</p>
          <input
            type="text"
            id="recipient-address"
            placeholder="introduce una dirección válida"
            autoComplete="off"
            value={recipientAddress}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setRecipientAddress(e.currentTarget.value)
            }
            className="form-input w-full rounded-lg border-2 border-gray-200 px-4 py-2"
          />
          <input
            type="number"
            id="ethAmount"
            placeholder="introduce una cantidad"
            step="0.00001"
            value={ethAmount}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setEthAmount(e.currentTarget.value)}
            className="form-input w-full rounded-lg border-2 border-gray-200 px-4 py-2"
          />
          <div className="flex w-full space-x-4">
            <Button
              variant="outline"
              className="w-full"
              disabled={txIsLoading}
              onClick={() => setShowSendToInput(false)}
            >
              cancelar
            </Button>
            <Button
              className="w-full"
              disabled={!recipientAddress || !isAddress(recipientAddress) || txIsLoading}
              onClick={onTransfer}
            >
              enviar ETH
            </Button>
          </div>
          {txHash && (
            <p className="mt-2 text-sm italic text-gray-600">
              detalles de transacción:{' '}
              <a
                className="underline"
                href={`${links.baseSepolia.transactionExplorer}${txHash}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                explorador
              </a>
              .
            </p>
          )}
        </div>
      )}
      {/* Sign a message */}
      <div className="w-full max-w-xs space-y-2 md:max-w-sm">
        <p className="text-md font-bold text-gray-700">check-in tucán</p>
        <p className="text-sm text-gray-600">
          firma un mensaje y verifica que usaste <span className="font-bold">tucán</span>
        </p>
        <Button className="w-full" onClick={onSign}>
          firmar
        </Button>
        <textarea
          value={signature || 'No signature yet'}
          className="h-fit w-full rounded-md bg-slate-700 p-4 font-mono text-xs text-slate-50"
          rows={3}
          readOnly
        />
      </div>
      <div className="max-w-xs md:max-w-sm">
        <p className="text-md font-bold text-gray-700">exporta tu llave privada</p>
        <p className="mt-2 text-sm text-gray-600">puedes usar esta llave en otra cartera</p>
        <button
          type="button"
          className="mt-2 w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm"
          onClick={exportWallet}
        >
          exportar llave
        </button>
      </div>
      <div className="w-full max-w-xs space-y-2 md:max-w-sm">
        <p className="text-md font-bold text-gray-700">descubre más</p>
        <p className="mt-2 text-sm text-gray-600">
          puedes leer los{' '}
          <a
            className="underline"
            href={links.docs.embeddedWallets}
            target="_blank"
            rel="noreferrer noopener"
          >
            docs
          </a>{' '}
          de privy para aprender más sobre el uso de carteras de aplicaciones
        </p>
      </div>
    </AuthenticatedPage>
  )
}

export default EmbeddedWallet
