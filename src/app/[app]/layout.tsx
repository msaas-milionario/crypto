import { ExchangeProvider } from "@/components/context/exchange";
import { ModalOrderBookProvider } from "@/components/context/modal-order-book";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Loading } from "@/components/loading";
import { ModalOrderBook } from "@/components/ui/modal-order-book";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <ModalOrderBookProvider>
                <ExchangeProvider>

                    {/* <Image
                    src="/images/bg2.png"
                    alt="Imagem de fundo"
                    width={1920}
                    height={1022}
                    layout="contain"
                    className="fixed left-0 top-0 -z-10"
                /> */}
                    <img
                        src="/images/bg2.png"
                        alt="Imagem de fundo"
                        width={1920}
                        height={1022}
                        className="fixed left-0 top-0 -z-10 h-full"
                    />
                    <Header />
                    <div className="p-6 pt-32 pb-16">
                        {children}
                    </div>
                    <Footer />
                    <ModalOrderBook />
                </ExchangeProvider>
            </ModalOrderBookProvider>
            <Loading />
        </div >
    )
}