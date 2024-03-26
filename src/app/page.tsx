import Image from 'next/image';
import { headerFont } from '@/lib/fonts';
import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <div className="page items-center justify-center space-y-8 px-4 text-center md:space-y-6 md:px-8 lg:space-y-4">
      <div>
        <h1
          className={`${headerFont.className} text-center text-4xl text-[40px] md:text-5xl`}
        >
          encuentra un problema
          <br />
          <span className="xs:text-6xl text-5xl font-black text-destructive md:text-6xl">
            construye la solución
          </span>
        </h1>
      </div>
      <div className="lg:max-w-lg">
        <h3 className={`${headerFont.className} text-2xl sm:text-[2rem]`}>
          la plataforma para{' '}
          <span className="font-black text-destructive">builders</span> que
          construyen el futuro
        </h3>
        <Button
          size="lg"
          className={`${headerFont.className} z-10 mt-4 text-xl tracking-wide md:mt-8`}
        >
          🚧 en construcción 🏗️
        </Button>
      </div>
      <div className="w-3/5 md:w-1/3 lg:w-1/5 xl:w-1/6">
        <Image
          src="/icons/android-chrome-512x512.png"
          alt="A cool toucan logo"
          width="0"
          height="0"
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
