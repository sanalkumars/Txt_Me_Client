import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './Skeleton/SidebarSkeleton';

const Sidebar = () => {
    const { users ,getUsers,selectedUser,isUsersLoading } = useChatStore();

    const onlineUsers = [];

    useEffect(()=>{
        getUsers();
    },[getUsers]);

    if (isUsersLoading) return <SidebarSkeleton />
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar