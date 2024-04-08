

import { httpaxious } from "@/helper/httphelper";

export async function addtaskt(task) {
  const result= await httpaxious.post("/api/tasks", task).then((response) => response.data);
  console.log(task);
  return result
}


export async function gettaskofuser(userId) {
  const result= await httpaxious.get(`/api/user/${userId}/task`).then((response) => response.data);
  return result
}

export async function deletetaskcall(taskId) {
  console.log(taskId);
  const result= await httpaxious.delete(`/api/tasks/${taskId}`).then((response) => response.data);
  return result
}


export async function getalltask() {
  const result= await httpaxious.get(`/api/tasks`).then((response) => response.data);
  return result
}


export async function updatetasklike(taskid,data) {
  console.log(data);
  const result= await httpaxious.put(`/api/tasks/${taskid}`,data).then((response) => response.data);
  return result
}



