import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddModal from "@components/Admin/AddModal";
import Pagination from "@components/Admin/Pagination";
import Table from "@components/Admin/Table";
import SearchBar from "@components/Admin/SearchBar";
import { useCategoriesData } from "@hooks/useCategoriesData";
import { SearchContainer } from "@style";

function AdminManageCategories() {
    const [query, setQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const engPattern = /[a-zA-Z]/;
    const korPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    // const [editID, setEditID] = useState(null);
    const { data, isLoading, error } = useCategoriesData();
    const columns = [
        { field: "name", header: "카테고리" },
        { field: "color", header: "색상" },
    ];

    if (isLoading) return <h2>Loading...</h2>; // skeleton으로 변경
    if (error) return <h2>{error.message}</h2>;

    const filterComponent = (data) => {
        data = data?.filter((cat) => {
            if (query === "") {
                return cat;
            }

            if (
                (korPattern.test(query) && cat.name.includes(query)) ||
                cat.color.includes(query)
            ) {
                return cat;
            }

            if (
                (engPattern.test(query) &&
                    cat.name.toLowerCase().includes(query.toLowerCase())) ||
                cat.color.toLowerCase().includes(query.toLowerCase())
            ) {
                return cat;
            }
        });
        return data;
    };

    const currentData = filterComponent(data).slice(firstIndex, lastIndex);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">카테고리 관리</h1>
            <SearchContainer>
                {/* 서치바 */}
                <SearchBar setQuery={setQuery} />
                {/* 추가 버튼 */}
                <button
                    className="hidden sm:block btn cursor-pointer text-white text-base p-3"
                    onClick={() => setShowModal(true)}
                >
                    <span className="flex items-center justify-between text-xs">
                        추가하기
                        <PlusIcon className="w-4 h-4 ml-1 text-white" />
                    </span>
                </button>
                <button
                    className="btn btn-square btn-xs sm:hidden"
                    onClick={() => setShowModal(true)}
                >
                    <PlusIcon className="w-5 h-5" />
                </button>
            </SearchContainer>
            {/* 테이블 */}
            <form className="overflow-auto">
                <Table currentData={currentData} columns={columns} />
            </form>
            <Pagination
                totalPosts={data.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <AddModal visible={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
}

export default AdminManageCategories;
