import { BASE_URL } from "./baseurl";
import { commonapi } from "./commonapi";

// add employee
export const addUser=(body,header)=>{
    return commonapi("POST",`${BASE_URL}/add`,body,header)
}
// get employee
export const getUsers=async(search)=>{
    return await commonapi("GET",`${BASE_URL}/get/allusers?search=${search}`,"")
}
// delete employee
export const deleteUser=async(id)=>{
    return await commonapi("DELETE",`${BASE_URL}/delete/user/${id}`,{}) 
}
export const editUser=async(id,body,header)=>{
    return await commonapi("PUT",`${BASE_URL}/edit/user/${id}`,body,header)
}