
import { httpaxious } from "@/helper/httphelper";

export async function getlike(userid , taskid) {
    console.log(userid , taskid);
    const result = await httpaxious.get(`/api/user/${userid}/task/${taskid}`).then((response) => response.data);
    return result
}

export async function addlike(data) {
    console.log(data);
    const result = await httpaxious.post(`/api/likeclick`,data).then((response) => response.data);
    return result
}

export async function deletelike(userid , taskid) {
    const result = await httpaxious.delete(`/api/user/${userid}/task/${taskid}`).then((response) => response.data);
    return result
}