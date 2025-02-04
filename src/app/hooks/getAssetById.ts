import HooksError from "../utils/hooks-error";

export default async function useGetAssetsById(id: string): Promise<HooksError | AssetById> {
    try {
        const res = await fetch(`${process.env.API_COINCAP}/assets/${id}`)
        const crypto = await res.json();
        
        return crypto?.data ?? [];
    } catch(e) {
        console.log(e)
        return new HooksError("Erro! ao tentar puxar os ativos");
    }
    
}

export type AssetById = {
    id: string,
    rank: string,
    symbol: string,
    name: string,
    supply: string,
    maxSupply: string,
    marketCapUsd: string,
    volumeUsd24Hr: string,
    priceUsd: string,
    changePercent24Hr: string,
    vwap24Hr: string
}