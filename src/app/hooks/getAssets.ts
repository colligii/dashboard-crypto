import HooksError from "../utils/hooks-error";

export default async function useGetAssets() {
    try {
        const res = await fetch(`${process.env.API_COINCAP}/assets`)
        const crypto = await res.json();
        
        return crypto?.data ?? [];
    } catch(e) {
        console.log(e)
        return new HooksError("Erro! ao tentar puxar os ativos");
    }
    
}