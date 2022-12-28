import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Routes, Route } from "react-router-dom";
import { useState, createContext, useReducer, useContext } from "react";
import AdminPage from "@pages/admin/AdminPage";
import Search from "@components/mainpage/header/Search";
import MainPage from "@pages/main/Mainpage";
import NotFound from "@components/mainpage/main/NotFound";
import ProductsMainPage from "@pages/products/ProductsMainPage";
import FeedWritePage from "@pages/feed/write/FeedWritePage";
import ProductsDatailPage from "@pages/products/detail/ProductsDatailPage";

/* 마이페이지 */
import MyPage from "@pages/mypage/MyPage";
import MyPageReview from "@pages/mypage/MyPageReview";
import MypageMyFeed from "@pages/mypage/MyPageFeed";
import MyPageLike from "@pages/mypage/MyPageLike";
import MypageUserFeed from "@pages/mypage/MypageUserFeed";
import MyPageFollowing from "@pages/mypage/MyPageFollowing";

import { Login } from "@components/mainpage/header/Login";
import { initialState } from "@context/LoginContext";

function App() {
    const client = new QueryClient({
        defaultOptions: {},
    });
    const LoginContext = createContext(initialState)
    const LoginFile = useContext(LoginContext)

    return (
        <>
            <div className="App">
                {/* <LoginContext.Provider value={LoginFile.a = 111}> */}
                <QueryClientProvider client={client}>
                    <Routes>
                        {/* <Route path="/main" element={<MainPage />} /> */}
                        {/* <Route path="/social/feed" element={<FeedPage />} /> */}
                        <Route path="login/callback" element={<Login />} />
            
                        {/* 마이페이지 */}
                        <Route path="/my" element={<MyPage LoginFile={LoginFile}
                        />} />
                        <Route path="/my/review" element={<MyPageReview />} />
                        <Route path="/my/feed" element={<MypageMyFeed />} />
                        <Route path="/my/like" element={<MyPageLike />} />
                        <Route path="/my/userFeed" element={<MypageUserFeed />} />
                        <Route path="/my/follow" element={<MyPageFollowing />} />

                        <Route path="/products" element={<ProductsMainPage />}
                        />
                        <Route path="/products/detail/:productsid" element={<ProductsDatailPage />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/social/feed/write" element={<FeedWritePage />} />
                        <Route path="/admin/*" element={<AdminPage />} />
                    </Routes>
                    <ReactQueryDevtools
                        initialIsOpen={false}
                        position="bottom-right"
                    />
                </QueryClientProvider>
                {/* </LoginContext.Provider> */}
            </div>
        </>
    );
}

export default App;
