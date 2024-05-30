'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

interface NavLinkProps {
    children: ReactNode
    href: string
    imagePath: string
    no_active: boolean
}

export function NavLink({ children, href, imagePath, no_active }: NavLinkProps) {
    const pathname = usePathname()

    return (
        <li>
            <Link href={href} className={`relative ${no_active ? 'pointer-events-none' : ''} text-lg font-white flex items-center gap-4 ${pathname.includes(href) ? 'text-orange' : 'text-white'}`}>
                {no_active && (
                    <span className="px-1 leading-4 opacity-95 absolute right-0 -top-3 text-[10px] bg-orange rounded-sm text-white font-semibold">Em breve</span>
                )}
                <Image
                    src={`/images/icons/${imagePath}.png`}
                    alt={`/app${imagePath}`}
                    width={32}
                    height={32}
                    className={`${no_active ? 'opacity-40' : ''}`}
                />
                <span className={`${no_active ? 'opacity-40' : ''}`}>{children}</span>
            </Link>
        </li>
    )
}