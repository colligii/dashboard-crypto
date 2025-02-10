"use client"

import { use } from "react";
import useSWR from "swr";

const fetcher = async (url: string) => {
    const res = await fetch(url);
    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message);
    }

    return json;
};

export default function CryptoPage({ params }: any) {

    const _params: any = use(params);
    const { data, error } = useSWR(`/api/crypto/${_params.id}`, fetcher, {
        refreshInterval: 6000,
        shouldRetryOnError: false,
    })

    return <>
        <div className="pt-16">
            {/* Mensagem de erro */}
            {
                error &&
                <span>
                    {error?.message ?? "Erro inesperado na API! tente novamente mais tarde"}
                </span>
            }
            {/* Conteudo */}
            {
                data &&
                <main className="p-2">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col">
                            <span className="font-bold">Name:</span>
                            <span>{data.name}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Price:</span>
                            <span>{Number(data.priceUsd).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Market Cap:</span>
                            <span>{Number(data.marketCapUsd).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Last 24h change:</span>
                            <span>{(Number(data.changePercent24Hr) / 100).toLocaleString("en-US", { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </main>
            }
        </div>
    </>
}