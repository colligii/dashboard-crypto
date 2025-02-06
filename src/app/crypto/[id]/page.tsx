import useGetAssetsById from "@/app/hooks/getAssetById"
import HooksError from "@/app/utils/hooks-error";

export default async function CryptoPage({ params }: any) {

    const { id } = await params;
    const cryptoInfo = await useGetAssetsById(id)

    if (cryptoInfo instanceof HooksError)
        return

    return (
        <main className="pt-[68px] p-2">
            <div className="flex flex-wrap gap-4">
                <div className="flex flex-col">
                    <span className="font-bold">Name:</span>
                    <span>{cryptoInfo.name}</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-bold">Price:</span>
                    <span>{Number(cryptoInfo.priceUsd).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-bold">Market Cap:</span>
                    <span>{Number(cryptoInfo.marketCapUsd).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                </div>
            </div>
        </main>
    )
}