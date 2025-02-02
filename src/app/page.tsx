import useGetAssets from "./hooks/getAssets";
import HooksError from "./utils/hooks-error";
import BearImage from "./shared/sources/img/bear/bear-md.png";

declare var process: any;

export default async function Home() {

    const crypto = await useGetAssets()

    return (
        <>
            {
                crypto instanceof HooksError ?
                <div className="w-screen h-screen flex flex-col items-center justify-center">
                    <img src={BearImage.src} width={200} height={200}/>
                    <p className="font-bold text-lg">{crypto.message}</p>
                </div> :
                <div>
                    {crypto.map(item => item.symbol)}
                </div>
            }
        </>
    )
}