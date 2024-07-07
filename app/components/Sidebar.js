// components/Sidebar.js
"use client"
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Home, BookOpen, Settings, Coffee,Box } from 'react-feather';
import Link from 'next/link';

const CustomSidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`relative flex flex-col h-full bg-white shadow-lg transition-width duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between h-16 bg-gray-100 p-4">
        <div className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-200 ${collapsed ? 'justify-center' : 'justify-start'} space-x-2`}>
          <Box className="w-6 h-6" />
          {!collapsed && <span className="ml-2 text-lg font-bold">Study with me</span>}
        </div>
        <button onClick={toggleSidebar} className="absolute right-0 p-2 bg-gray-200 rounded-md transform translate-x-1/2 -translate-y-1/2 top-1/2">
          {collapsed ? <ArrowRight /> : <ArrowLeft />}
        </button>
      </div>
      <div className="flex-1 p-4 space-y-4">
        <Link href="/" passHref>
          <div className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-200 ${collapsed ? 'justify-center justify-between ' : 'justify-start '} space-x-2`}>
            <Home className="w-6 h-6" />
            {!collapsed && <span>Home</span>}
          </div>
        </Link>
        <Link href="/books" passHref>
          <div className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-200 ${collapsed ? 'justify-center justify-between ' : 'justify-start'} space-x-2`}>
            <BookOpen className="w-6 h-6" />
            {!collapsed && <span>Task other users</span>}
          </div>
        </Link>
        <Link href="/settings" passHref>
          <div className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-200 ${collapsed ? 'justify-center justify-between ' : 'justify-start'} space-x-2`}>
            <Settings className="w-6 h-6" />
            {!collapsed && <span>Settings</span>}
          </div>
        </Link>
        <Link href="https://buymeacoffee.com/justuswaechter" passHref>
          <div className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-200 ${collapsed ? 'justify-center justify-between ' : 'justify-start'} space-x-2`}>
            <Coffee className="w-6 h-6" />
            {!collapsed && <span>Buy me a Coffee</span>}
          </div>
        </Link>
        {/* Weitere Links können hier hinzugefügt werden */}
      </div>
      <div className="flex items-center justify-start h-16 bg-gray-100">
        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default CustomSidebar;
