import { NavLink } from "./nav-link";

export function Navbar() {
    return (
        <nav className="relative w-[240px] flex items-start z-50">
            <div className="flex flex-col gap-16 px-8">
                <ul className="flex flex-col gap-12">
                    <NavLink
                        no_active={false}
                        href="/app/dash"
                        imagePath="dash"
                    >Dashboard</NavLink>
                    <NavLink
                        no_active={true}
                        href="/canais"
                        imagePath="canais"
                    >Canais</NavLink>
                    <NavLink
                        no_active={true}
                        href="/mentoria"
                        imagePath="mentoria"
                    >Mentoria</NavLink>
                    <NavLink
                        no_active={true}
                        href="/Suporte"
                        imagePath="suporte"
                    >Suporte</NavLink>
                    <NavLink
                        no_active={true}
                        href="/perfil"
                        imagePath="perfil"
                    >Perfil</NavLink>
                </ul>
            </div>
        </nav>
    )
}