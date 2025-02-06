import useGetAssetsById from "@/app/hooks/getAssetById";
import HooksError from "@/app/utils/hooks-error";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    return Response.json({"id":"bitcoin","rank":"1","symbol":"BTC","name":"Bitcoin","supply":"19820634.0000000000000000","maxSupply":"21000000.0000000000000000","marketCapUsd":"1915511109481.5289675721523840","volumeUsd24Hr":"11920039826.7835266547026047","priceUsd":"96642.2723653304413760","changePercent24Hr":"0.0625798160526953","vwap24Hr":"97434.2194239407741260","explorer":"https://blockchain.info/"})
    
    const { id } = await params
    const cryptoInfo = await useGetAssetsById(id)

    if(cryptoInfo instanceof HooksError)
        return Response.json(cryptoInfo, { status: 400 })

    return Response.json(cryptoInfo)
}