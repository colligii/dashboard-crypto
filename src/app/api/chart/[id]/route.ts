import useGetAssetHistoryById from "@/app/hooks/getAssetHistoryById";
import HooksError from "@/app/utils/hooks-error";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const data = await useGetAssetHistoryById((await params).id)

    if(data instanceof HooksError)
        return Response.json(data, { status: 400 })

    return Response.json(data);
}