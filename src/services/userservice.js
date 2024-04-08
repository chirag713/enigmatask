
import { httpaxious } from "@/helper/httphelper";

export async function Signupuser(task) {
  console.log("Hello");
  console.log(task);
  const result = await httpaxious.post("/api/user", task).then((response) => response.data);
  return result
}



export async function Loginuser(task) {
  const result = await httpaxious.post("/api/login", task).then((response) => response.data);
  return result
}


export async function currentuser() {
  const result = await httpaxious.get("/api/current").then((response) => response.data);
  return result
}


export async function logoutuser() {
  const result = await httpaxious.post("/api/logout").then((response) => response.data);
  return result
}
