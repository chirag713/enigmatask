

import { httpaxious } from "@/helper/httphelper";


export async function commentadd(task) {
    console.log(task);
    const result = await httpaxious.post("/api/comments", task).then((response) => response.data);
    return result
}


export async function getcomment(task) {
    console.log(task);
    const result = await httpaxious.get(`/api/tasks/${task}/comments`).then((response) => response.data);
    return result
}

