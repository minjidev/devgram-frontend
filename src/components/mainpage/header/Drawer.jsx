import React from "react";
import { Link } from "react-router-dom";
import { useCategories } from "@context/CategoriesContext";

function Drawer() {
    const categoriesData = useCategories();
    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

            <ul className="menu p-4 w-60 bg-base-100">
                <li className="text-xl font-bold italic mb-2">DEVGRAM</li>
                <li>
                    <div className="hover:bg-white pl-0">
                        <button className="btn btn-outline w-1/2 border-point-blue border-1.5 hover:bg-gray-100 hover:text-black ">
                            <Link to="/login">로그인</Link>
                        </button>
                        <button className="btn px-5 bg-point-blue w-1/2 border-0 whitespace-nowrap hover:bg-blue-500">
                            <Link to="/mypage">마이페이지</Link>
                        </button>
                    </div>
                </li>
                <hr />

                {/* 사이드바 */}
                <li>
                    <div className="font-bold text-lg hover:bg-white cursor-default">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 6h.008v.008H6V6z"
                            />
                        </svg>
                        카테고리
                    </div>
                </li>
                {categoriesData.map((category) => (
                    <li
                        key={category.id}
                        className="rounded hover:bg-gray-100 "
                    >
                        <Link to={`/products/category=${category.name}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
                <hr />
                <li>
                    <Link to="/products/ranking">BEST</Link>
                </li>
                <li>
                    <Link to="/social/feed">FEED</Link>
                </li>
            </ul>
        </div>
    );
}

export default Drawer;
