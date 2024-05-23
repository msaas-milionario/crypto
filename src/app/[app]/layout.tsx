import { ExchangeProvider } from "@/components/context/exchange";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import Image from "next/image";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative ">
            <ExchangeProvider>
                <Image
                    src="/images/bg2.png"
                    alt="Imagem de fundo"
                    width={1920}
                    height={1022}
                    className="fixed left-0 top-0 -z-10"
                />
                <Header />
                <div className="p-6 pt-32 pb-16">
                    {children}
                </div>
                <Footer />
            </ExchangeProvider>
        </div>
    )
}