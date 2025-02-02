import HooksError from "../utils/hooks-error";

export default async function useGetAssets(): Promise<HooksError | AssetsFetch[]> {
    try {
        const res = await fetch(`${process.env.API_COINCAP}/assets`)
        const crypto = await res.json();
        
        return crypto?.data ?? [];
    } catch(e) {
        console.log(e)
        return new HooksError("Erro! ao tentar puxar os ativos");
    }
    
}

export type AssetsFetch = {
    changePercent24Hr: string
    explorer: string
    id: string
    marketCapUsd: string
    maxSupply: string 
    name: string 
    priceUsd: string
    rank: string 
    supply: string
    symbol: string
    volumeUsd24Hr: string
    vwap24Hr: string
}