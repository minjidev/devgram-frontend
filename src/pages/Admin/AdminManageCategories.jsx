import React, { Fragment, useEffect, useState } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import AddModal from "@components/Admin/AddModal";
import ReadOnlyRow from "@components/Admin/ReadOnlyRow";
import EditableRow from "@components/Admin/EditableRow";
import Pagination from "@components/Admin/Pagination";
import { useCategoriesData } from "@hooks/useCategoriesData";
import { SearchContainer, Input, Table } from "@style";

function AdminManageCategories() {
    const [query, setQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const engPattern = /[a-zA-Z]/;
    const korPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const [editID, setEditID] = useState(null);
    const { data, isLoading, error } = useCategoriesData();
    if (isLoading) return <h2>Loading...</h2>; // skeleton으로 변경
    if (error) return <h2>{error.message}</h2>;

    const filterComponent = (data) => {
        data = data?.filter((cat) => {
            if (query === "") {
                return cat;
            } else if (
                (korPattern.test(query) && cat.name.includes(query)) ||
                cat.color.includes(query)
            ) {
                return cat;
            } else if (
                (engPattern.test(query) &&
                    cat.name.toLowerCase().includes(query.toLowerCase())) ||
                cat.color.toLowerCase().includes(query.toLowerCase())
            ) {
                return cat;
            }
        });
        return data;
    };

    const currentCategoriesData = filterComponent(data).slice(
        firstIndex,
        lastIndex
    );

    const handleEdit = (data) => {
        setEditID(data.id);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">카테고리 관리</h1>
            <SearchContainer>
                {/* 서치바 */}
                <div className="relative w-full mr-6 flex items-center">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute ml-3 pointer-events-none" />
                    <Input
                        type="search"
                        placeholder="검색"
                        autoComplete="off"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                {/* 추가 버튼 */}
                <button
                    className="hidden sm:block btn cursor-pointer text-white text-base"
                    onClick={() => setShowModal(true)}
                >
                    추가하기
                </button>
                <button
                    className="btn btn-square btn-xs sm:hidden"
                    onClick={() => setShowModal(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </button>
            </SearchContainer>
            {/* 테이블 */}
            <form className="overflow-auto">
                <Table>
                    <thead>
                        <tr>
                            <th>카테고리</th>
                            <th>색상</th>
                            <th>수정</th>
                            <th>{editID > 0 ? "취소" : "삭제"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCategoriesData.map((data) => (
                            <Fragment key={data.id}>
                                {editID === data.id ? (
                                    <EditableRow
                                        data={data}
                                        handleEdit={handleEdit}
                                    />
                                ) : (
                                    <ReadOnlyRow
                                        data={data}
                                        handleEdit={handleEdit}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </Table>
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
