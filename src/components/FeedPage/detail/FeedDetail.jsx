import React from "react";
import { useParams } from "react-router-dom";
import { useFeedDetailData } from "@hooks/useFeedData";

function FeedDetail(props) {
    const { id } = useParams();
    // const qna = {
    //     []
    // }

    const { data, isLoading, isError, error } = useFeedDetailData(
        id,
        `http://localhost:3000/social/feed`
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{error}</div>;
    const feed = data[0];

    return (
        <div className="px-10 lg:px-32 flex flex-col">
            {/* 타이틀 영역 */}
            <div className="flex justify-between text-xl font-bold py-3">
                <h2>{feed.title}</h2>
                <button className="btn btn-sm text-white text-xs">
                    팔로우
                </button>
            </div>
            {/* 사용된 상품 영역 */}
            <div className="flex py-3">
                {feed.products_used.map((product) => (
                    <div
                        key={product.id}
                        className="max-w-[140px] bg-white border border-gray-200 rounded-lg
                shadow-md mr-2"
                    >
                        <a href="#">
                            <img
                                className="rounded-t-lg"
                                src={product.img_url}
                                alt={product.title}
                            />
                        </a>
                        <div className="p-5">
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {product.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {/* 대문 사진 */}
            <img
                src={feed.main_img_url}
                alt={feed.title}
                className="rounded-lg"
            />

            {/* 메인 사진 영역  */}
        </div>
    );
}

export default FeedDetail;
