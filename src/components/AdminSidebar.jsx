import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { TagIcon, ArchiveBoxIcon, FlagIcon } from "@heroicons/react/24/outline";

function AdminSidebar() {
    const [open, setOpen] = useState(false);
    const NavMenus = [
        {
            title: "카테고리 관리",
            path: "/admin/categories",
            icon: <TagIcon className="w-6 h-6" />,
        },
        {
            title: "상품 관리",
            path: "/admin/products",
            icon: <ArchiveBoxIcon className="w-6 h-6" />,
        },
        {
            title: "신고 관리",
            path: "/admin/reports",
            icon: <FlagIcon className="w-6 h-6" />,
        },
    ];

    return (
        <>
            <div
                className={`${
                    open ? "w-64" : "w-20"
                } duration-300 h-screen bg-gray-100 relative pt-8 flex flex-col justify-between`}
            >
                <ArrowLeftCircleIcon
                    className={`h-8 w-8 absolute top-9 -right-3 cursor-pointer ${
                        !open && "rotate-180"
                    }`}
                    onClick={() => setOpen(!open)}
                />

                <ul>
                    {NavMenus.map((menu, index) => (
                        <Link
                            key={index}
                            to={menu.path}
                            className="text-gray-800 text-sm items-center flex mx-5 gap-x-4 items-center cursor-pointer p-2 pt-3
                            hover:bg-gray-200 rounded-md"
                        >
                            {menu.icon}
                            <span
                                className={`${
                                    !open && "hidden"
                                } origin-left duration-200`}
                            >
                                {menu.title}
                            </span>
                        </Link>
                    ))}
                </ul>
                <div>
                    <div className="flex items-center gap-x-4">
                        <img
                            src="/assets/profile-man.jpg"
                            alt="user profile"
                            className={
                                "w-10 h-10 rounded-full cursor-pointer duration-500 mx-5"
                            }
                        />
                        <h1
                            className={`font-medium text-gray-800 origin-left duration-200 dark:text-white
                        ${!open && "scale-0"}`}
                        >
                            Jese Leos
                        </h1>
                    </div>
                    <div className="h-12 bg-gray-800 text-white mt-4 flex items-center justify-center">
                        로그아웃
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSidebar;
