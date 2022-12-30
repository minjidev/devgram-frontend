import React, { createContext, useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Routes, Route } from "react-router-dom";
import AdminPage from "@pages/admin/AdminPage";
import Search from "@components/mainpage/header/Search";
import MainPage from "@pages/main/Mainpage";
import NotFound from "@components/mainpage/main/NotFound";
import ProductsMainPage from "@pages/products/ProductsMainPage";
import FeedWritePage from "@pages/feed/write/FeedWritePage";
import ProductsDatailPage from "@pages/products/detail/ProductsDatailPage";
import FeedMainPage from "@pages/Feed/main/FeedMainPage";

/* 마이페이지 */
import MyPage from "@pages/mypage/MyPage";
import MyPageReview from "@pages/mypage/MyPageReview";
import MyPageFeed from "@pages/mypage/MyPageFeed";
import MyPageLike from "@pages/mypage/MyPageLike";
import MypageUserFeed from "@pages/mypage/MypageUserFeed";
import MyPageFollowing from "@pages/mypage/MyPageFollowing";

import Login from "@components/mainpage/header/Login";

function App() {
    const client = new QueryClient({
        defaultOptions: {},
    });

    return (
        <>
            <div className="App">
                <QueryClientProvider client={client}>
                    <Routes>
                        {/* 메인 페이지 */}
                        <Route path="/" element={<MainPage />} />
                        <Route path="/admin/*" element={<AdminPage />} />
                        {/* 피드 페이지 */}
                        <Route path="/social/feed" element={<FeedMainPage />} />
                        <Route
                            path="/social/feed/write"
                            element={<FeedWritePage />}
                        />
                        <Route path="/login/callback" element={<Login />} />
                        {/* 마이페이지 */}
                        <Route path="/my" element={<MyPage 
                        />} />
                        <Route path="/my/review" element={<MyPageReview />} />
                        <Route path="/my/feed" element={<MyPageFeed />} />
                        <Route path="/my/like" element={<MyPageLike />} />
                        <Route
                            path="/my/userFeed"
                            element={<MypageUserFeed />}
                        />
                        <Route
                            path="/my/follow"
                            element={<MyPageFollowing />}
                        />
                        <Route
                            path="/products"
                            element={<ProductsMainPage />}
                        />
                        {/* 상품 페이지 */}
                        <Route path="/products/detail/:id" element={<ProductsDatailPage />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <ReactQueryDevtools
                        initialIsOpen={false}
                        position="bottom-right"
                    />
                </QueryClientProvider>
            </div>
        </>
    );
}

export default App;
