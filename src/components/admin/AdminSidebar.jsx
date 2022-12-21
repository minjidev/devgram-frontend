import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { TagIcon, ArchiveBoxIcon, FlagIcon } from "@heroicons/react/24/outline";

function AdminSidebar({ open, setOpen }) {
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
                className={`w-20 ${
                    open ? "sm:w-64" : "sm:w-20"
                } duration-300 bg-gray-100 fixed pt-8 flex flex-col justify-between h-full`}
            >
                <ArrowLeftCircleIcon
                    className={`hidden sm:block h-8 w-8 absolute top-9 -right-3 cursor-pointer ${
                        !open && "rotate-180"
                    }`}
                    onClick={() => {
                        setOpen(!open);
                        console.log("open:", open);
                    }}
                />

                <ul>
                    {NavMenus.map((menu, index) => (
                        <li key={index}>
                            <Link
                                to={menu.path}
                                className="text-gray-800 text-sm items-center flex mx-5 gap-x-4 cursor-pointer p-2 pt-3
                                hover:bg-gray-200 rounded-md"
                            >
                                {menu.icon}
                                <span
                                    className={`hidden ${
                                        !open ? "sm:hidden" : "sm:block"
                                    } origin-left duration-200`}
                                >
                                    {menu.title}
                                </span>
                            </Link>
                        </li>
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
                            className={`hidden sm:font-medium sm:text-gray-800 origin-left duration-200 dark:text-white
                        ${!open ? "sm:scale-0" : "sm:block"}`}
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
