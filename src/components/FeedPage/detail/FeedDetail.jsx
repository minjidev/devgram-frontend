import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useParams, Link } from "react-router-dom";
import { useFeedDetailData, useFeedCommentsData } from "@hooks/useFeedData";
import Comments from "./Comments";
import Loader from "@components/products/ui/Loader";
import {
    useAddCommentsData,
    useFollowWriterData,
    useDeleteFeedData,
} from "@hooks/useFeedData";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import EditModal from "./EditModal";

function FeedDetail(props) {
    const { id } = useParams();
    const { ref: targetRef, inView } = useInView();
    const [commentValue, setCommentValue] = useState("");
    const [showModal, setShowModal] = useState(false);
    const handleClick = (e) => {
        setCommentValue(e.currentTarget.value);
    };

    const { mutate } = useAddCommentsData();
    const { mutate: followWriter } = useFollowWriterData();
    const { mutate: deleteFeed } = useDeleteFeedData();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView]);
    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            boardSeq: id,
            content: commentValue,
        };
        mutate({
            data: data,
        });
        setCommentValue("");
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
        hasNextPage,
        fetchNextPage,
    } = useFeedCommentsData(id, `http://52.194.161.226:8080/api/comments`);

    if (isLoading || isCommentsLoading)
        return (
            <div className="flex justify-center">
                <Loader />
            </div>
        );
    if (isError) return <div>{error}</div>;
    if (isCommentsError) return <div>{commentError}</div>;

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
    const onFollowClick = () => {
        followWriter(feedData.createdBySeq);
    };

    const onDeleteFeedClick = () => {
        deleteFeed(id);
    };

    const onClose = () => {
        setShowModal(false);
    };

    if (isSuccess && isCommentsSuccess)
        return (
            <div className="px-10 lg:px-32 flex flex-col">
                {/* 타이틀 영역 */}
                <div className="flex justify-between text-3xl font-bold py-3">
                    <div className="flex flex-col mt-5">
                        <h2 className="pr-2">{feedData.title}</h2>
                        <p>
                            <span className="italic text-base">by </span>
                            <span className="text-lg">
                                {feedData.createdBy || "writer"}
                            </span>
                        </p>
                    </div>
                    <div className="flex flex-col items-end justify-start">
                        {/* 피드 수정 & 삭제 */}
                        <div className="dropdown">
                            <label
                                tabIndex={0}
                                className="m-1 cursor-pointer relative -top-10"
                            >
                                <EllipsisHorizontalIcon className="w-5 h-5" />
                            </label>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu p-1 absolute top-5 shadow bg-base-100 rounded-box w-24 text-sm"
                            >
                                <li>
                                    <button onClick={() => setShowModal(true)}>
                                        수정
                                    </button>
                                </li>
                                <li>
                                    <Link to="/social/feed">
                                        <button onClick={onDeleteFeedClick}>
                                            삭제
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* 사용된 상품 영역 */}
                <p className="text-sm">
                    사용된 장비 {feedData.productUsed.length}개
                </p>
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
                        feedData.imageUrl ||
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
                    {commentsData?.pages?.map((page) =>
                        (Array.isArray(page) ? page : []).map((comment) => (
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
                    <div className="h-1" ref={targetRef}></div>
                </div>
                <EditModal
                    feedData={feedData}
                    visible={showModal}
                    onClose={onClose}
                    boardSeq={id}
                />
            </div>
        );
}

export default FeedDetail;
