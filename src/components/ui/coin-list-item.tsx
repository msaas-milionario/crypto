import Image from "next/image";
import { ReactNode } from "react";

interface CoinListItemProps {
    text: string
}

export function CoinListItem({ text }: CoinListItemProps) {
    return (
        <li className="exchange-box rounded-lg text-white font-bold flex items-center gap-4 px-3 py-4 w-full text-sm">
            <Image
                src={`/images/exchanges/${text}.png`}
                alt=""
                width={32}
                height={32}
                className="absolute left-4"
            />
            {text === 'mb' ? (
                <span className="ps-12">Mercado Bitcoin</span>
            ) : (
                <span className="ps-12">{text}</span>
            )
            }
        </li >
    )
}