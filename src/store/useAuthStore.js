import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser: null,
    isSigningUp :false,
    isLoggingIn: false,
    isUpdating: false,

    isCheckingAuth:true,

    // these are the functions
    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data});
        } catch (error) {
            console.log("error occured is ",error);
            set({authUser:null});
        } finally{
            set({ isCheckingAuth :false});
        }
    },
    // this function is for implementing the signup logic
    signup:async (data) => {
        set({ isSigningUp :true });
        try {
            const response = await axiosInstance.post("/auth/signup",data);
            toast.success("Account Created Successfully...");
            set({ authUser : response?.data}); //This is how we set the value to the global state
        } catch (error) {
            console.log("error",error);
            toast.error(error.response.data.message);
        }finally{
            set( { isSigningUp:false});
        }
    },
}))