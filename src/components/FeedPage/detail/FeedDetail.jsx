import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFeedDetailData, useFeedCommentsData } from "@hooks/useFeedData";
import Comments from "./Comments";
import Loader from "@components/products/ui/Loader";
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
            children: [],
        };
        mutate({
            data: data,
        });
        isMutationDone && setCommentValue("");
    };

    const {
        data: feedData,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useFeedDetailData(id, `http://52.194.161.226:8080/api/boards`);

    const {
        data: commentsData,
        isLoading: isCommentsLoading,
        isError: isCommentsError,
        error: commentError,
        isSuccess: isCommentsSuccess,
    } = useFeedCommentsData(id, `http://52.194.161.226:8080/api/comments`);

    if (isLoading || isCommentsLoading)
        return (
            <div className="flex justify-center">
                <Loader />
            </div>
        );
    if (isError) return <div>{error}</div>;
    if (isCommentsError) return <div>{commentError}</div>;
    console.log("feed: ", feedData);
    console.log("comments: ", commentsData.pages);
    const qna = [
        {
            question: "자기소개",
            answer: `${feedData.intro}`,
        },
        {
            question: "베스트 추천 장비",
            answer: `${feedData.productsBest}`,
        },

        {
            question: "기타 추천 장비",
            answer: `${feedData.productsRecommend}`,
        },
        {
            question: "추천 이유",
            answer: `${feedData.productsRecommendReason}`,
        },
        {
            question: "마지막으로 하고 싶은 말",
            answer: `${feedData.last}`,
        },
    ];

    if (isSuccess && isCommentsSuccess)
        return (
            <div className="px-10 lg:px-32 flex flex-col">
                {/* 타이틀 영역 */}
                <div className="flex justify-between text-3xl font-bold py-6">
                    <h2 className="pr-20">{feedData.title}</h2>
                    <button className="btn btn-sm text-white text-xs">
                        팔로우
                    </button>
                </div>
                {/* 사용된 상품 영역 */}
                <p className="text-sm">사용된 장비 {feedData.tagCount}개</p>
                <div className="flex pb-3 pt-1">
                    {feedData.productUsed.map((product) => (
                        <div
                            key={product.id}
                            className="max-w-[140px] bg-white border border-gray-200 rounded-lg
                shadow-md mr-2"
                        >
                            <Link to={`/products/detail/${product.id}`}>
                                <img
                                    className="rounded-t-lg"
                                    src={
                                        product.imgUrl ||
                                        "https://images.unsplash.com/photo-1420406676079-b8491f2d07c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBtYWN8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                                    }
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
                    src={
                        feedData.imgUrl ||
                        "https://images.unsplash.com/photo-1520155346-36773ab29479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2531&q=80"
                    }
                    alt={feedData.title}
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

                    <p className="text-2xl font-extrabold p-2">댓글</p>
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
                    {commentsData?.pages.map((page) =>
                        page.map((comment) => (
                            <article
                                key={comment.commentSeq}
                                className="py-6 text-base bg-white rounded-lg border-b"
                            >
                                <Comments
                                    key={comment.commentSeq}
                                    comment={comment}
                                />
                            </article>
                        ))
                    )}
                </div>
            </div>
        );
}

export default FeedDetail;
