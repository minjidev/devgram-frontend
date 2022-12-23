import React from "react";
import { useParams, Link } from "react-router-dom";
import { useFeedDetailData } from "@hooks/useFeedData";

function FeedDetail(props) {
    const { id } = useParams();

    const { data, isLoading, isError, error } = useFeedDetailData(
        id,
        `http://localhost:3000/social/feed`
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{error}</div>;
    const feed = data[0];
    const qna = [
        {
            question: "자기소개",
            answer: `${feed.intro}`,
        },
        {
            question: "베스트 추천 장비",
            answer: `${feed.products_best}`,
        },

        {
            question: "기타 추천 장비",
            answer: `${feed.products_recommened}`,
        },
        {
            question: "추천 이유",
            answer: `${feed.products_recommended_reason}`,
        },
        {
            question: "마지막으로 하고 싶은 말",
            answer: `${feed.last}`,
        },
    ];

    return (
        <div className="px-10 lg:px-32 flex flex-col">
            {/* 타이틀 영역 */}
            <div className="flex justify-between text-xl font-bold py-3">
                <h2 className="pr-20">{feed.title}</h2>
                <button className="btn btn-sm text-white text-xs">
                    팔로우
                </button>
            </div>
            {/* 사용된 상품 영역 */}
            <p className="text-sm">사용된 장비 {feed.tags_count}개</p>
            <div className="flex pb-3 pt-1">
                {feed.products_used.map((product) => (
                    <div
                        key={product.id}
                        className="max-w-[140px] bg-white border border-gray-200 rounded-lg
                shadow-md mr-2"
                    >
                        <Link to={`/products/${product.id}`}>
                            <img
                                className="rounded-t-lg"
                                src={product.img_url}
                                alt={product.title}
                            />

                            <div className="p-2">
                                <p className="text-sm text-gray-700 dark:text-gray-400">
                                    {product.title}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {/* 메인 사진 영역  */}
            <img
                src={feed.main_img_url}
                alt={feed.title}
                className="rounded-lg pb-3"
            />
            {/* 질문 답변 영역 */}
            <div className="pb-3">
                {qna.map((qa, index) => (
                    <ul key={index}>
                        {qa.answer.length > 0 && (
                            <li className="pb-8 lg:pb-10">
                                <p className="text-lg font-bold pb-2">
                                    {qa.question}
                                </p>
                                <p>{qa.answer}</p>
                            </li>
                        )}
                    </ul>
                ))}
            </div>
        </div>
    );
}

export default FeedDetail;
