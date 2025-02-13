import { create }  from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set)=({
    messages:[],
    users:[],
    selectedUser: null,
    isUsersLoading: false,
    iseMessagesLoading: false,

    getUsers : async () => {
        set({isUsersLoading : true});
        try {
            const res = await axiosInstance.get("/message/users");
            if (res.status===200) {
                set({users : res.data});
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({ isUsersLoading : false });
        }
    },

    getMessages:async (userId) => {
        set({ iseMessagesLoading : true});
        try {
            const res = axiosInstance.get(`/message/${userId}`);
            if (res.status===200) {
                set({messages : res.data});
            }
        } catch (error) {
            toast.error(error.response.data.message);

        }finally{
            set({ iseMessagesLoading : false });
        }
    },
    setSelectedUser: (selectedUser) =>set({selectedUser}),
}))