'use client'

import { usePrivy } from '@privy-io/react-auth'
import { links } from '@/lib/links'
import Link from 'next/link'
import AuthenticatedPage from '@/components/layout/authenticatedPage'

const Cuenta = () => {
  // You can also import other linking methods, like linkWallet, linkEmail, linkDiscord, etc.
  const { user, linkGoogle, linkFarcaster, linkWallet } = usePrivy()

  return (
    <AuthenticatedPage className="text-center">
      <div className="max-w-xs md:max-w-sm">
        <p className="text-md mt-2 font-bold text-gray-700">usuario privy</p>
        <p className="mt-2 text-sm text-gray-600">
          puedes aprender más sobre{' '}
          <Link
            href={links.docs.userObject}
            className="underline"
            target="_blank"
            rel="noreferrer noopener"
          >
            usuarios en privy
          </Link>
        </p>
        <textarea
          value={JSON.stringify(user, null, 2)}
          className="mt-4 h-64 w-full rounded-md bg-slate-700 p-4 font-mono text-xs text-slate-50 disabled:bg-slate-700"
          rows={JSON.stringify(user, null, 2).split('\n').length}
          readOnly
        />
      </div>
      <div className="max-w-xs md:max-w-sm">
        <p className="text-md mt-8 font-bold text-gray-700">conecta otras cuentas</p>
        <p className="mt-2 text-sm text-gray-600">habilita otros métodos de login</p>
        <div className="flex flex-row gap-2">
          <button
            className="my-4 w-1/3 rounded-md bg-indigo-600 px-2 py-2.5 text-xs font-semibold text-white shadow-sm disabled:bg-indigo-400"
            onClick={linkGoogle}
            disabled={!!user?.google}
          >
            google {!!user?.google && '✅'}
          </button>
          <button
            className="my-4 w-1/3 rounded-md bg-indigo-600 px-2 py-2.5 text-xs font-semibold text-white shadow-sm disabled:bg-slate-400"
            onClick={linkFarcaster}
            disabled
          >
            farcaster (pronto)
          </button>
          <button
            className="my-4 w-1/3 rounded-md bg-indigo-600 px-2 py-2.5 text-xs font-semibold text-white shadow-sm  disabled:bg-slate-400"
            onClick={linkWallet}
            disabled
          >
            cartera EOA (pronto)
          </button>
        </div>
      </div>
    </AuthenticatedPage>
  )
}

export default Cuenta
