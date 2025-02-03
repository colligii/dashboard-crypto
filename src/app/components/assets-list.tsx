"use client"

import { FixedSizeList } from "react-window"
import { AssetsFetch } from "../hooks/getAssets"
import { useRef, useState, useEffect } from "react"
import Link from "next/link";

export default function AssetsList({ assets }: AssetsListProps) {

    const mainList = useRef<HTMLDivElement | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            if (mainList.current) {
                setDimensions({
                    width: mainList.current.clientWidth,
                    height: mainList.current.clientHeight
                });
            }
        };

        updateSize(); // Chama na montagem para pegar os valores iniciais

        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const AssetItem = ({ index, style }: any) => {
        const asset = assets[index];
        return <Link href={`/crypto/${asset.id}`}>
            <div className="cursor-pointer flex items-center flex-col border-b-2 border-gray-300 justify-center p-2 pl-4 flex-wrap" style={style}>
                <p><span className="font-bold">Name:</span>{asset.name}</p>
                <p><span className="font-bold">Price:</span>{(+asset.priceUsd).toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                <p><span className="font-bold">Volume 24Hrs:</span>{(+asset.volumeUsd24Hr).toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                <p><span className="font-bold">Market Cap:</span>{(+asset.marketCapUsd).toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
            </div>
        </Link>;
    }

    return (
        <div className="pt-[66px]">
            <div className="h-[40px] pl-4 font-black text-xl">
                CryptoAssets List:
            </div>
            <div ref={mainList} style={{ height: "calc(100vh - 106px)" }} className="w-full">
                <FixedSizeList
                    height={dimensions.height}
                    width={dimensions.width}
                    itemCount={assets.length}
                    itemSize={80}
                >
                    {AssetItem}
                </FixedSizeList>
            </div>
        </div>
    );
}

export type AssetsListProps = {
    assets: AssetsFetch[]
}
