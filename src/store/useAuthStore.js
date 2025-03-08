import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser: null,
    isSigningUp :false,
    isLoggingIn: false,
    isUpdating: false,
    onlineUsers: [],
    socket: null,
    isCheckingAuth:true,

    // these are the functions
    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
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

    login:async (data) => {
        set({isLoggingIn : true});
        try {
            const res = await axiosInstance.post("/auth/login",data);
            console.log("response for login is ",res);
            if(res.status===200){
                set({authUser:res?.data.data});
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally{
            set({isLoggingIn : false});
        }
    },

    logout:async () => {
        try {
            const res = await axiosInstance.post("/auth/logout");
            if (res.status===200) {
                set({authUser:null});
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    },

    updateProfile: async (data) => {
        set({isUpdating :true});
        try {
            const res = await axiosInstance.put("/auth/update-profile",data);
            console.log("response ",res);
            set({authUser:res?.data?.updateUser});
            toast.success(res?.data?.message)
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally{
            set({isUpdating:false});
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
    
        const socket = io(BASE_URL, {
          query: {
            userId: authUser._id,
          },
        });
        socket.connect();
    
        set({ socket: socket });
    
        socket.on("getOnlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
        });
      },
      disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
      },
}))