import { NavLink } from "./nav-link";

export function Navbar() {
    return (
        <nav className="relative w-[240px] flex items-start z-50">
            <div className="flex flex-col gap-16 px-8">
                <ul className="flex flex-col gap-12">
                    <NavLink
                        href="/dash"
                        imagePath="dash"
                    >Dashboard</NavLink>
                    <NavLink
                        href="/canais"
                        imagePath="canais"
                    >Canais</NavLink>
                    <NavLink
                        href="/mentoria"
                        imagePath="mentoria"
                    >Mentoria</NavLink>
                    <NavLink
                        href="/Suporte"
                        imagePath="suporte"
                    >Suporte</NavLink>
                    <NavLink
                        href="/perfil"
                        imagePath="perfil"
                    >Perfil</NavLink>
                </ul>
            </div>
        </nav>
    )
}