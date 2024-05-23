'use client'

import Image from "next/image"

interface AddBtnProps {
    imagePath: string
    cryptoText: string
}

export function AddBtn({ cryptoText, imagePath }: AddBtnProps) {
    return (
        <>
            <Image
                src={`/images/exchanges/${imagePath}.png`}
                alt=""
                width={32}
                height={32}
                className="absolute left-4"
            />
            <span className="ps-16 text-white">{cryptoText}</span>
        </>
    )
}