import Image from "./sources/img/logo/logo-sm.png"
export default function Header() {
    return <header className="w-screen absolute flex h-[66px] items-center justify-center">
        <img src={Image.src} width={50} height={50}/>
        <div className="flex flex-col items-center justify-center pt-4">
            <span className="leading-[12px]">Mercado</span>
            <span className="text-lg font-black leading-[22px]">Bull Run</span>
        </div>
    </header>
}