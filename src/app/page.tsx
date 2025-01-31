import useGetAssets from "./hooks/getAssets";

declare var process: any;

export default async function Home() {

    const crypto = await useGetAssets()

    console.log(crypto)

    return (
        <div></div>
    )
}