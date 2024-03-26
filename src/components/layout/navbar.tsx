'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { headerFont } from '@/lib/fonts';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import MobileMenu from './mobileMenu';

export default function Navbar() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <nav className="sticky top-0 h-16 bg-background">
      <div className="mx-auto flex h-full max-w-7xl justify-between px-4">
        <div className="flex items-center space-x-0 md:space-x-4">
          <Link
            href="/"
            className="flex items-center gap-1 px-2 text-black hover:text-primary"
          >
            <div className="flex items-center">
              <Image
                src="/icons/tucan-logo-512x512.png"
                alt="tucán logo"
                height={48}
                width={48}
              />
            </div>
            <span
              className={`${headerFont.className} text-4xl font-black tracking-tighter hover:text-destructive`}
            >
              tucán
            </span>
          </Link>
        </div>

        {/* Primary Navbar items */}
        <div
          className={`${headerFont.className} hidden items-center space-x-4 lg:flex`}
        >
          <Link href="#">
            <Button
              variant="outline"
              size="sm"
              className={`${headerFont.className} text-md`}
            >
              comunidad
            </Button>
          </Link>
          <Link href="#">
            <Button
              variant="outline"
              size="sm"
              className={`${headerFont.className} text-md`}
            >
              recursos
            </Button>
          </Link>
          <Button
            variant={authenticated ? 'outline' : 'default'}
            size="sm"
            className={`${headerFont.className} text-md`}
            onClick={
              authenticated
                ? () => setAuthenticated(false)
                : () => setAuthenticated(true)
            }
          >
            {authenticated ? 'salir' : 'entrar'}
          </Button>
        </div>

        <div className="flex items-center lg:hidden">
          <MobileMenu
            authenticated={authenticated}
            login={() => setAuthenticated(true)}
            logout={() => setAuthenticated(false)}
          />
        </div>
      </div>
    </nav>
  );
}
