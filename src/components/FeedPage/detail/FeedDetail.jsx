import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFeedDetailData, useFeedCommentsData } from "@hooks/useFeedData";
import Comment from "./Comment";
import { useAddCommentsData } from "@hooks/useFeedData";

function FeedDetail(props) {
    const { id } = useParams();
    const [commentValue, setCommentValue] = useState("");
    const handleClick = (e) => {
        setCommentValue(e.currentTarget.value);
    };
    const { mutate, isSuccess: isMutationDone } = useAddCommentsData();
    console.log(commentValue);

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            id: 5,
            text: commentValue,
            author: "currentUser",
            children: [],
        };
        mutate({
            data: data,
        });
        isMutationDone && setCommentValue("");
    };

    const { data, isLoading, isError, error, isSuccess } = useFeedDetailData(
        id,
        `http://localhost:3000/social/feed`
    );

    const {
        data: commentsData,
        isLoading: isCommentsLoading,
        isError: isCommentsError,
        error: commentError,
        isSuccess: isCommentsSuccess,
    } = useFeedCommentsData(
        id,
        `http://localhost:3000/social/feed/commentData`
    );

    if (isLoading || isCommentsLoading) return <div>Loading...</div>;
    if (isError) return <div>{error}</div>;
    if (isCommentsError) return <div>{commentError}</div>;
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

    if (isSuccess && isCommentsSuccess)
        return (
            <div className="px-10 lg:px-32 flex flex-col">
                {/* 타이틀 영역 */}
                <div className="flex justify-between text-3xl font-bold py-6">
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
                {/* 댓글 영역 */}
                <div className="py-3">
                    {/* <hr className="mt-8 mb-4 h-px w-full bg-gray-200 border-0 dark:bg-gray-700"></hr> */}

                    <p className="text-2xl font-extrabold p-2">
                        댓글({commentsData.length})
                    </p>
                    {/* 댓글 작성창 */}
                    <form
                        onSubmit={onSubmit}
                        className="flex items-center gap-3"
                    >
                        <textarea
                            className="w-full rounded-lg border p-2"
                            onChange={handleClick}
                            value={commentValue}
                            placeholder="댓글을 작성해주세요"
                        />
                        <br />
                        <button className="btn">확인</button>
                    </form>
                    {commentsData.map((comment) => (
                        <article
                            key={comment.id}
                            className="py-6 text-base bg-white rounded-lg border-b"
                        >
                            <Comment key={comment.id} comment={comment} />
                        </article>
                    ))}
                </div>
            </div>
        );
}

export default FeedDetail;
