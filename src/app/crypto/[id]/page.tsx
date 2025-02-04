import useGetAssetsById from "@/app/hooks/getAssetById"
import HooksError from "@/app/utils/hooks-error";


export default async function CryptoPage({ params }: any) {

    const { id } = await params;
    const cryptoInfo = await useGetAssetsById(id)

    if(cryptoInfo instanceof HooksError)
        return 

    return (
        <h1>{cryptoInfo.name}</h1>
    )
}