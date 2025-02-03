"use client"

import { FixedSizeList } from "react-window"
import { AssetsFetch } from "../hooks/getAssets"
import { useRef } from "react"

export default function AssetsList({ assets }: AssetsListProps) {

    const mainList = useRef<HTMLDivElement | null>(null);

    const AssetItem = ({ index, style }: any) => {
        const asset = assets[index];

        return <div style={style}>
            {asset.name}
        </div>
    }

    return (
        <div ref={mainList} className="w-full h-full">
            <FixedSizeList
                height={mainList.current?.clientHeight ?? 0}
                width={mainList.current?.clientWidth ?? 0}
                itemCount={assets.length}
                itemSize={35}
            >
                {AssetItem}
            </FixedSizeList>
        </div>
    )
}

export type AssetsListProps = {
    assets: AssetsFetch[]
}