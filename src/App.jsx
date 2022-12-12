import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Routes, Route } from "react-router-dom";
import Search from "@components/MainPage/Header/Search";
import MainPage from "@pages/Main/MainPage";
import NotFound from "@components/MainPage/Main/NotFound";

function App() {
    const client = new QueryClient({
        defaultOptions: {},
    });
    return (
        <>
            <div className="App">
                <QueryClientProvider client={client}>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/home" element={<MainPage />} />
                        {/* <Route
                            path="/products/ranking"
                            element={<ProductsBestPage />}
                        /> */}
                        {/* <Route path="/social/feed" element={<FeedPage />} /> */}
                        {/* <Route path="/login" element={<LogIn />} /> */}
                        {/* <Route path="/mypage" element={<MyPage />} /> */}
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
