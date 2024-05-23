import Image from "next/image";

export function Header() {
    return (
        <div className="w-full flex justify-between items-center mt-12">
            <div className="w-48 translate-x-12">
                <Image
                    src="/images/logo.png"
                    alt="Imagem de fundo"
                    width={518}
                    height={133}
                    className=""
                />
            </div>
            <h4 className="text-white -translate-x-12 text-2xl uppercase">Bem vindo <span className="font-semibold">Evandro Martins</span></h4>
        </div>
    )
}