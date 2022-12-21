import React, { useState } from "react";
import Pagination from "@components/admin/ui/Pagination";
import SearchBar from "@components/admin/ui/SearchBar";
import { SearchContainer } from "@style";
import EditableTable from "@components/admin/table/EditableTable";
import Table from "@components/admin/table/Table";
import AddButton from "@components/admin/ui/AddButton";
import Tabs from "@components/admin/ui/Tabs";
import AddModal from "@components/admin/ui/AddModal";

function AdminManage({
    title,
    columns,
    useData,
    useAddData,
    useEditData,
    useDeleteData,
    hasAddButton = true,
    isEditable = true,
    toggledTab,
    setToggledTab,
}) {
    const [query, setQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const engPattern = /[a-zA-Z]/;
    const korPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const { data, isLoading, error } = useData();

    if (isLoading)
        return (
            <div role="status" className="flex justify-center">
                <svg
                    aria-hidden="true"
                    className="mr-2 w-5 h-5 text-gray-200 animate-spin fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span className="sr-only">로딩...</span>
            </div>
        );
    if (error) return <h2>{error.message}</h2>;

    const filterComponent = (data) => {
        data = data?.filter((row) => {
            if (query === "") {
                return row;
            }

            if (
                korPattern.test(query) &&
                columns.some(
                    (col) =>
                        korPattern.test(row[col.field]) &&
                        row[col.field].includes(query)
                )
            ) {
                return row;
            }

            if (
                engPattern.test(query) &&
                columns.some((col) => {
                    return (
                        engPattern.test(row[col.field]) &&
                        row[col.field]
                            .toLowerCase()
                            .includes(query.toLowerCase())
                    );
                })
            ) {
                return row;
            }
        });
        return data;
    };

    const currentData = filterComponent(data).slice(firstIndex, lastIndex);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">{title} 관리</h1>
            {!hasAddButton && (
                <Tabs toggledTab={toggledTab} setToggledTab={setToggledTab} />
            )}
            <SearchContainer>
                {/* 서치바 */}
                <SearchBar setQuery={setQuery} />
                {/* 추가 버튼 */}
                {hasAddButton && <AddButton setShowModal={setShowModal} />}
            </SearchContainer>
            {/* 테이블 */}
            {isEditable ? (
                <form className="overflow-auto">
                    <EditableTable
                        currentData={currentData}
                        columns={columns}
                        useEditData={useEditData}
                        useDeleteData={useDeleteData}
                    />
                </form>
            ) : (
                <div className="overflow-auto sm:overflow-visible">
                    <Table
                        currentData={currentData}
                        columns={columns}
                        toggledTab={toggledTab}
                    />
                </div>
            )}

            <Pagination
                totalPosts={data.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            {hasAddButton && (
                <AddModal
                    visible={showModal}
                    onClose={() => setShowModal(false)}
                    columns={columns}
                    useAddData={useAddData}
                />
            )}
        </div>
    );
}

export default AdminManage;
