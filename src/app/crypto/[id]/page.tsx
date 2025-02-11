"use client"

import Loading from '@/app/components/loading';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { use, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
    const [chartJsConfig, setChartJsConfig] = useState<any>(null);
    const { data, error, isLoading } = useSWR(`/api/crypto/${_params.id}`, fetcher, {
        refreshInterval: 6000,
    })
    const { data: cryptoHistory, error: cryptoErrorHistory, isLoading: cryptoHistoryLoading } = useSWR(`/api/chart/${_params.id}`, fetcher, {
        refreshInterval: 60000
    })

    function getError() {
        return error ?? cryptoErrorHistory
    }

    useEffect(() => {
        if (!Array.isArray(cryptoHistory))
            return;

        setChartJsConfig({
            labels: cryptoHistory.map(history => history.date),
            datasets: [{
                label: `${_params.id} price`,
                data: cryptoHistory.map(history => +history.priceUsd),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        });
    }, [cryptoHistory])

    if(cryptoHistoryLoading || isLoading)
        return <Loading/>

    return <>
        <div className="pt-16">
            {/* Mensagem de erro */}
            {
                getError() &&
                <span className="fixed bottom-2 left-1/2 -translate-x-1/2 text-center text-white bg-red-700 rounded-md p-3">
                    {getError()?.message ?? "Unespected error on API, don't close the page."}
                </span>
            }
            {/* Conteudo */}
            {
                data &&
                <main className="p-2">
                    <section className="p-2">
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
                    </section>

                    {isLoading ? "teste" : "false"}
                    <div className="h-screen w-11/12 flex items-center justify-center">
                        {chartJsConfig && <Line data={chartJsConfig} options={{ maintainAspectRatio: false }} />}
                    </div>

                </main>
            }
        </div>
    </>
}