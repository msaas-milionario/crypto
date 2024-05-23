'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

interface NavLinkProps {
    children: ReactNode
    href: string
    imagePath: string
}

export function NavLink({ children, href, imagePath }: NavLinkProps) {
    const pathname = usePathname()

    return (
        <li>
            <Link href={href} className={`text-lg font-white flex items-center gap-4 ${pathname.includes(href) ? 'text-orange' : 'text-white'}`}>
                <Image
                    src={`/images/icons/${imagePath}.png`}
                    alt={`/app${imagePath}`}
                    width={32}
                    height={32}
                />
                <span>{children}</span>
            </Link>
        </li>
    )
}