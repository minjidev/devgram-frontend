import React, { useState } from "react";
import {
    ChevronDownIcon,
    EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import {
    useAddReportedCommentsData,
    useAddChildrenCommentsData,
    useDeleteCommentsData,
    useEditCommentsData,
} from "@hooks/useFeedData";

function CommentParent({ comment, setShowChildren }) {
    const [showInput, setShowInput] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commetInput, setCommentInput] = useState("");
    const [accuseReason, setAccuseReason] = useState("");
    const [editID, setEditID] = useState(null);
    const [commentEdited, setCommentEdited] = useState(comment.content);

    const handleAccuseClick = (e) => {
        setAccuseReason(e.currentTarget.value);
    };

    const handleCommentClick = (e) => {
        setCommentInput(e.currentTarget.value);
    };

    const { mutate, isSuccess: isMutationDone } = useAddReportedCommentsData();
    const { mutate: addComment, isSuccess: isCommentMutationDone } =
        useAddChildrenCommentsData();
    const { mutate: deleteComments } = useDeleteCommentsData();
    const { mutate: editComments } = useEditCommentsData();

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
        setEditID(-1);
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

    const onClickEdit = () => {
        setEditID(comment.commentSeq);
    };
    const onClickDelete = (e) => {
        deleteComments(e.target.id);
    };

    const editCommentClick = (e) => {
        setCommentEdited(e.target.value);
    };

    const onEditCommentSubmit = (e) => {
        e.preventDefault();

        const data = {
            commentSeq: comment.commentSeq,
            content: commentEdited,
        };
        editComments(data);

        setEditID(-1);
    };

    return (
        <div className="mb-5">
            {/* 댓글작성자 + 댓글 내용 */}
            <div className="flex mb-2 justify-between">
                <div className="flex items-center">
                    <img
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        className="mr-4 w-10 h-10 rounded-full self-start"
                    />
                    {/* 이미지 오른쪽 */}
                    <div>
                        <p className="font-semibold text-sm">
                            @{comment.createdBy}
                        </p>
                        {/* 댓글 수정 & 내용 */}
                        {editID === comment.commentSeq ? (
                            <form
                                onSubmit={onEditCommentSubmit}
                                className="flex items-center gap-3 py-2"
                            >
                                <textarea
                                    className="min-w-[300px] rounded-lg border p-2"
                                    onChange={editCommentClick}
                                    value={commentEdited}
                                ></textarea>
                                <button
                                    type="submit"
                                    className="btn bg-point-blue border-0 hover:bg-point-blue"
                                >
                                    수정
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-ghost btn-active font-bold"
                                    onClick={() => setEditID(-1)}
                                >
                                    취소
                                </button>
                            </form>
                        ) : (
                            <p className="pb-2">{comment.content}</p>
                        )}

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
                        {/* 대댓글 열기 버튼 */}
                        {Array.isArray(comment.includedCommentList) &&
                            comment.includedCommentList.length > 0 && (
                                <button
                                    className="my-1 text-point-blue font-bold flex items-center"
                                    onClick={() =>
                                        setShowChildren((prev) => !prev)
                                    }
                                >
                                    <p>
                                        <ChevronDownIcon className="w-4 h-4 mr-2" />
                                    </p>
                                    <p>replies</p>
                                </button>
                            )}
                    </div>
                </div>
                {/* 댓글 수정 & 삭제 */}
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

export default CommentParent;
