import { Comfortaa, Raleway } from 'next/font/google';

export const globalFont = Raleway({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const headerFont = Comfortaa({
  subsets: ['latin'],
  variable: '--font-georama',
});
