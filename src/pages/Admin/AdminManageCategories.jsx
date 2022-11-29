import React, { useEffect, useState } from "react";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import tw from "tailwind-styled-components";
import AddModal from "@components/AddModal";

const SearchContainer = tw.div`
flex 
items-center 
justify-between 
w-full max-w-lg 
text-base 
text-normal 
focus-within:text-gray-800
`;

const Input = tw.input`
    bg-gray-100 
    p-3 
    pl-10 
    h-10 
    text-base 
    rounded-xl 
    flex-1 
    w-full 
    text-black
    outfocus:outline-0 focus:outline-gray-300
`;

const Table = tw.table`
    table 
    table-auto 
    w-full 
    max-w-lg 
    my-3 
    text-base 
    font-normal
`;

function AdminManageCategories() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    // api data 받아오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/users"
                );
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <div>로딩 중...</div>;
    if (!data) return null;

    return (
        <>
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
                    className="btn cursor-pointer text-white text-base"
                    onClick={() => setShowModal(true)}
                >
                    추가하기
                </button>
            </SearchContainer>

            {/* 테이블 */}
            <Table>
                <thead>
                    <tr>
                        <th>카테고리</th>
                        <th>색상</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        .filter((cat) => {
                            if (query === "") {
                                return cat;
                            } else if (
                                cat.name
                                    .toLowerCase()
                                    .includes(query.toLowerCase()) ||
                                cat.username
                                    .toLowerCase()
                                    .includes(query.toLowerCase())
                            ) {
                                return cat;
                            }
                        })
                        .map((data) => (
                            <tr key={data.id}>
                                <td>{data.name}</td>
                                <td>{data.username}</td>
                                <td>
                                    <button className="btn btn-outline btn-ghost">
                                        수정
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-outline btn-error">
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <AddModal visible={showModal} onClose={() => setShowModal(false)} />
        </>
    );
}

export default AdminManageCategories;
