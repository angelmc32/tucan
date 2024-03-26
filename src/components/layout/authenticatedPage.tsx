'use client'

import BottomNav from '@/components/layout/bottomNav'
import { usePrivy } from '@privy-io/react-auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AuthenticatedPageProps {
  children: React.ReactNode
  className: string
}

const AuthenticatedPage = ({ children, className }: AuthenticatedPageProps) => {
  const router = useRouter()
  const { ready, authenticated } = usePrivy()

  useEffect(() => {
    if (ready && !authenticated) router.push('/')
  }, [ready, authenticated, router])

  if (!ready) {
    return (
      <div className="page space-y-4 !pt-32">
        <div
          className="text-surface inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        />
        <p className="text-xl">cargando...</p>
      </div>
    )
  }

  if (ready && !authenticated) {
    return (
      <div className="page space-y-4 !pt-32">
        <p className="text-xl">redirigiendo...</p>
      </div>
    )
  }

  return (
    <>
      <div className={`auth-page ${className}`}>{children}</div>
      {ready && authenticated && <BottomNav />}
    </>
  )
}

export default AuthenticatedPage
