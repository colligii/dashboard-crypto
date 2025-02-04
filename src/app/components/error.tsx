"use client"

import BearImage from "@/app/shared/sources/img/bear/bear-md.png"

export default function BaseErrorComponent({ message }: BaseErrorComponentProps) {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <img src={BearImage.src} width={200} height={200}/>
            <p className="font-bold text-lg">{message}</p>
        </div>
    )
}

export type BaseErrorComponentProps = {
    message: string
}