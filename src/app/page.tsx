import useGetAssets from "./hooks/getAssets";
import HooksError from "./utils/hooks-error";

declare var process: any;

export default async function Home() {

    const crypto = await useGetAssets()

    console.log(crypto)

    return (
        <>
            {
                crypto instanceof HooksError ?
                <div className="w-screen h-screen flex items-center justify-center">
                    {crypto.message}
                </div> :
                <div>
                    Lista
                </div>
            }
        </>
    )
}