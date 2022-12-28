import React, { useState } from "react";
import {
    useAddReportedCommentsData,
    useAddChildrenCommentsData,
    useDeleteCommentsData,
} from "@hooks/useFeedData";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

function CommentChildren({ comment }) {
    const [showInput, setShowInput] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commetInput, setCommentInput] = useState("");
    const [accuseReason, setAccuseReason] = useState("");

    const handleAccuseClick = (e) => {
        setAccuseReason(e.currentTarget.value);
    };

    const handleCommentClick = (e) => {
        setCommentInput(e.currentTarget.value);
    };

    const { mutate } = useAddReportedCommentsData();
    const { mutate: addComment } = useAddChildrenCommentsData();
    const { mutate: deleteComments } = useDeleteCommentsData();

    const onReportSubmit = (e) => {
        e.preventDefault();

        const data = {
            id: comment.commentSeq,
            reason: accuseReason,
        };
        mutate({
            data: data,
        });
        setAccuseReason("");
    };

    const onCommentSubmit = (e) => {
        e.preventDefault();

        const data = {
            boardSeq: comment.boardSeq,
            content: commetInput,
            parentCommentSeq: comment.commentSeq,
            commentGroup: comment.commentGroup,
        };
        addComment({
            data: data,
        });
        setCommentInput("");
    };

    const onClickEdit = () => {};
    const onClickDelete = (e) => {
        deleteComments(e.target.id);
    };

    return (
        <div className="mb-5 ml-10" key={comment.commentSeq}>
            {/* 댓글작성자 + 댓글 내용 */}
            <div className="flex justify-between mb-2">
                <div className="flex">
                    <img
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        className="mr-4 w-10 h-10 rounded-full self-start"
                    />
                    {/* 이미지 오른쪽 */}
                    <div>
                        <p className="text-sm">
                            @
                            <span className="font-bold px-1">
                                {comment.parentCommentCreatedBy}
                            </span>
                        </p>
                        <p className="pb-2">{comment.content}</p>
                        {/* 댓글 남기기 */}
                        <button
                            className="text-sm font-bold mr-5"
                            onClick={() => setShowCommentInput((prev) => !prev)}
                        >
                            답글 달기
                        </button>

                        <button
                            className="text-sm font-bold"
                            onClick={() => {
                                setShowInput((prev) => !prev);
                            }}
                        >
                            신고
                        </button>
                        {showCommentInput && (
                            <form
                                onSubmit={onCommentSubmit}
                                className="flex items-center gap-3 py-2"
                            >
                                <textarea
                                    className="min-w-[300px] rounded-lg border p-2"
                                    onChange={handleCommentClick}
                                    value={commetInput}
                                    placeholder="댓글을 작성해주세요"
                                ></textarea>
                                <button className="btn">확인</button>
                            </form>
                        )}
                        {showInput && (
                            <form
                                onSubmit={onReportSubmit}
                                className="flex items-center gap-3 py-2"
                            >
                                <textarea
                                    className="min-w-[300px] rounded-lg border p-2"
                                    onChange={handleAccuseClick}
                                    value={accuseReason}
                                    placeholder="신고하고자 하는 이유를 작성해주세요"
                                ></textarea>
                                <button className="btn">확인</button>
                            </form>
                        )}
                    </div>
                </div>
                {/* 댓글 수정&삭제 */}
                <div className="dropdown">
                    <label tabIndex={0} className="m-1 cursor-pointer relative">
                        <EllipsisHorizontalIcon className="w-5 h-5" />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-1 absolute top-12 shadow bg-base-100 rounded-box w-24"
                    >
                        <li>
                            <button
                                id={comment.commentSeq}
                                onClick={onClickEdit}
                            >
                                수정
                            </button>
                        </li>
                        <li>
                            <button
                                id={comment.commentSeq}
                                onClick={onClickDelete}
                            >
                                삭제
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CommentChildren;
