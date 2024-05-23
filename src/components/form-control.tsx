import { ReactNode } from "react"

interface FormControlProps {
    label: string
    children: ReactNode
}

export function FormControl({ children, label }: FormControlProps) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-zinc-400">{label}</label>
            {children}
        </div>
    )
}