import {create} from "zustand"
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set)=>({
    authUser: null,
    isSigningUp :false,
    isLoggingIn: false,
    isUpdating: false,

    isCheckingAuth:true,

    // these are the functions
    checkAuth:async()=>{
        try {
            const res = axiosInstance.get("/auth/check")
            set({authUser:res.data});
        } catch (error) {
            console.log("error occured is ",error);
            set({authUser:null});
        } finally{
            set({ isCheckingAuth :false});
        }
    },
    // this function is for implementing the signup logic
    signUp:async (data) => {
        
    },
}))