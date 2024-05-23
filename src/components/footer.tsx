import Link from "next/link";

export function Footer() {
    return (
        <div className="w-full px-12 pb-8">
            <div className="w-full border-t border-orange pt-2 text-white flex justify-between">
                <Link href="">Contato</Link>
                <Link href="">Ajuda</Link>
            </div>
        </div>
    )
}