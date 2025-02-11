import useGetAssets from "./hooks/getAssets";
import HooksError from "./utils/hooks-error";
import BearImage from "./shared/sources/img/bear/bear-md.png";
import { VariableSizeList } from "react-window"
import AssetsList from "./components/assets-list";
import BaseErrorComponent from "./components/error";
import Loading from "./components/loading";

declare var process: any;

export default async function Home() {

    const crypto = await useGetAssets()

    return (
        <>
            {
                crypto instanceof HooksError ?
                    <BaseErrorComponent message={crypto.message} /> :
                    <div className="relative">
                        <div className="relative z-10">
                            <Loading />
                        </div>
                        <div className="absolute z-20 bottom-0 w-full">
                            <AssetsList
                                assets={crypto}
                            />
                        </div>
                    </div>
            }
        </>
    )
}