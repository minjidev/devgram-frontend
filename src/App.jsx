import React from "react";
import AdminPage from "@pages/Admin/AdminPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
    const client = new QueryClient({
        defaultOptions: {},
    });
    return (
        <>
            <div className="App">
                <QueryClientProvider client={client}>
                    <AdminPage />
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
