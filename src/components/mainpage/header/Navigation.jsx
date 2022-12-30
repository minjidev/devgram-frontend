import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
/* import { getUserData } from "@components/mainpage/header/Login"; */

export default function Navigation() {
    const [webUserData, setWebUserData] = useState({})

    /* const CLIENT_ID = "b3e8e3aa865dfc9d1d08"
    const CLIENT_SECRET = "3d49f22546744861cf19ab135e8b66581c5bb432" */
    
    /* 진수님 */
    const CLIENT_ID = "64f8af2227721d1a29ea"
    const CLIENT_SECRET = "85c18896e267fae3deda84c5a1bbfb93536793df"
    
    function logout() {
        /* const userToken = localStorage.getItem("webAccessToken")

        fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: userToken
        }),
        }).then((response) => console.log(response)); */
        /* useEffect(() => {
            fetch("http://52.194.161.226:8080/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: "Test",
                    body: "Testing!",
                    userId: 1,
                }),
            })
                .then((response) => response.json())
        }, [limitApi]); */
    }

    function loginWithGithub() {
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=` + CLIENT_ID)
    }

    return (
        <div className="h-full">
            <nav className="w-full navbar bg-white">
                <div className="flex-none sm:hidden">
                    <label
                        htmlFor="my-drawer-3"
                        className="btn btn-square btn-ghost"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-6 h-6 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </label>
                </div>
                {/* 네비 오른쪽 */}
                <div className="sm:px-10 lg:px-32 flex-auto">
                    <h1 className="flex-1 text-xl sm:px-2 sm:text-2xl font-bold italic">
                        <Link to="/">DEVGRAM</Link>
                    </h1>
                    <div className="flex-none hidden sm:block">
                        <ul className="flex flex-row p-4">
                            <li className="mr-3">
                                {localStorage.getItem('accessToken') ?
                                <>
                                    <button
                                    className="btn btn-xs btn-outline rounded-full" onClick={() => {
                                        localStorage.clear(); 
                                        logout()
                                        location.reload();
                                    }}>
                                        로그아웃
                                    </button>
                                    {/* <button onClick={getUserData }>데이터 받기</button> */}
                                </> 
                                : <button className="btn btn-xs btn-outline rounded-full"
                                onClick={loginWithGithub}
                                >
                                로그인
                                </button>}
                                
                            </li>
                            <li>
                                <button className="btn btn-xs rounded-full flex content-center text-white hover:bg-gray-500">
                                    <Link to="/my">마이페이지</Link>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <button className="px-2 sm:hidden">
                        <Link to="/search">
                            <MagnifyingGlassIcon className="w-5 h-5" />
                        </Link>
                    </button>
                </div>
            </nav>
            <hr className="h-px bg-gray-100 border-0 dark:bg-gray-700" />
        </div>
    );
}
