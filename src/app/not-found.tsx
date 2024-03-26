import { Button } from "@/components/ui/button";
import { headerFont } from "@/lib/fonts";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page justify-center items-center px-4 text-center pb-64">
      <h2
        className={`${headerFont.className} text-5xl tracking-tight md:text-6xl`}
      >
        404 | no encontrada
      </h2>
      <p className="mt-4 text-2xl">
        ¡parece que la página que buscas no existe!
      </p>
      <Link href="/">
        <Button
          className={`${headerFont.className} mt-6 text-lg md:mt-8 md:text-xl lg:mt-8 xl:mt-12`}
        >
          ir a inicio
        </Button>
      </Link>
    </div>
  );
}