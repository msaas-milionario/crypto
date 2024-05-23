import Image from "next/image"


export default function AppLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full min-h-screen grid grid-cols-2 bg-black">
            <div className="absolute h-screen w-1/2 flex items-center justify-center">
                <div className="w-96 z-50">
                    <Image
                        src="/images/logo.png"
                        alt="Imagem de fundo"
                        width={518}
                        height={133}
                        className=""
                    />
                </div>
                <div className="absolute top-0 left-0 w-3/3">
                    <Image
                        src="/images/bg.png"
                        alt="Imagem de fundo"
                        width={1160}
                        height={1080}
                    />
                </div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1 flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}