import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex gap-4">
        <Link href="/usuario/entrar">Entrar</Link>
        <Link href="/usuario/registrar">Registrar</Link>
      </div>
    </div>
  )
}