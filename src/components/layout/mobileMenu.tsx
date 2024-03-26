'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Menu } from 'lucide-react';

import { headerFont } from '@/lib/fonts';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';

type MobileMenuProps = {
  authenticated: boolean;
  login: () => void;
  logout: () => void;
  // menuItems?: [{ displayText: string; href: string }];
};

export default function MobileMenu({
  authenticated,
  login,
  logout,
}: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setIsMenuOpen(false);
  }

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger>
        <Menu size={28} />
      </SheetTrigger>
      <SheetContent className="border-l-0 bg-background">
        <SheetHeader className="mb-4 text-left">
          <SheetTitle className={`${headerFont.className}`}>menú</SheetTitle>
        </SheetHeader>
        <div className={`${headerFont.className} flex flex-col space-y-4`}>
          <Link
            href="https://frutero.club"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="mr-2">sitio web</span>
            <ExternalLink size={14} />
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
            onClick={() => setIsMenuOpen(false)}
          >
            <span>dework</span>
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="mr-2">notion</span>
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="mr-2">miembros</span>
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="mr-2">multisig</span>
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
            onClick={() => setIsMenuOpen(false)}
          >
            comunidad
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
            onClick={() => setIsMenuOpen(false)}
          >
            recursos
          </Link>
          <Button
            variant={authenticated ? 'outline' : 'default'}
            size="sm"
            className={`${headerFont.className} text-md`}
            onClick={authenticated ? handleLogout : login}
          >
            {authenticated ? 'salir' : 'entrar'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
