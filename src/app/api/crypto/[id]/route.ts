import useGetAssetsById from "@/app/hooks/getAssetById";
import HooksError from "@/app/utils/hooks-error";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const cryptoInfo = await useGetAssetsById(id)

    if(cryptoInfo instanceof HooksError)
        return Response.json(cryptoInfo, { status: 400 })

    return Response.json(cryptoInfo)
}