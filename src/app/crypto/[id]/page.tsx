"use client"

import { use } from "react";
import useSWR from "swr";

const fetcher = (url: string) => {
    console.log(url)
    return fetch(url).then(res => res.json())
};

export default function CryptoPage({ params }: any) {

    const _params: any = use(params);
    const data = useSWR(`/api/crypto/${_params.id}`, fetcher, {
        refreshInterval: 60000
    })

    return <h1>Teste {_params.id}</h1>

    // if (cryptoInfo instanceof HooksError)
    //     return

    // return (
    //     <main className="pt-[68px] p-2">
    //         <div className="flex flex-wrap gap-4">
    //             <div className="flex flex-col">
    //                 <span className="font-bold">Name:</span>
    //                 <span>{cryptoInfo.name}</span>
    //             </div>
    //             <div className="flex flex-col">
    //                 <span className="font-bold">Price:</span>
    //                 <span>{Number(cryptoInfo.priceUsd).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
    //             </div>
    //             <div className="flex flex-col">
    //                 <span className="font-bold">Market Cap:</span>
    //                 <span>{Number(cryptoInfo.marketCapUsd).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
    //             </div>
    //         </div>
    //     </main>
    // )
}