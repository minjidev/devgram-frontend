import React, { useEffect, useState } from "react";
import axios from "axios";
import { itMatchesOne } from "daisyui/src/lib/postcss-prefixer/utils";

const API_URL = "http://dummy.restapiexample.com/api/v1/employees";

function AdminManageCategories() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    // api data 받아오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(null);
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
            {/* 서치바  */}
            {/* <input type="search" /> */}
            {console.log(data)}
            {/* 추가 버튼 */}
            <button>추가하기</button>

            {/* 테이블  */}
            <table>
                <tbody>
                    {data.map((data) => (
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.username}</td>
                            <td>{data.email}</td>
                            <td>{data.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default AdminManageCategories;
