import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
    useAddReportedCommentsData,
    useAddChildrenCommentsData,
} from "@hooks/useFeedData";

function Comment({ comment }) {
    // 신고, 답글 달기 api 콜
    // 댓글 달기 api
    const [showChildren, setShowChildren] = useState(false);
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

    const { mutate, isSuccess: isMutationDone } = useAddReportedCommentsData();
    const { mutate: addComment, isSuccess: isCommentMutationDone } =
        useAddChildrenCommentsData();

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            id: comment.id,
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
            id: 6, // comment id
            text: commetInput,
            author: "currentUser", // user이름
            children: [],
        };
        addComment({
            data: data,
        });
        setCommentInput("");
    };

    const nestedComments = (comment.children || []).map((comment) => (
        <Comment key={comment.id} comment={comment} type="child" />
    ));

    //부모 + 자식 댓글
    return (
        <div className="ml-5 mb-5">
            {/* 각 댓글 */}
            <div className="mb-5">
                {/* 댓글작성자 + 댓글 내용 */}
                <div className="flex items-center mb-2">
                    <img
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        className="mr-4 w-10 h-10 rounded-full self-start"
                    />
                    {/* 이미지 오른쪽 */}
                    <div>
                        <p className="font-semibold text-sm">
                            @{comment.author}
                        </p>
                        <p>{comment.text}</p>
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
                                onSubmit={onSubmit}
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
                        <button
                            className="my-1 text-point-blue font-bold flex items-center"
                            onClick={() => setShowChildren((prev) => !prev)}
                        >
                            <p>
                                <ChevronDownIcon className="w-4 h-4 mr-2" />
                            </p>
                            <p>{comment.children.length} replies</p>
                        </button>
                    </div>
                </div>
            </div>
            {showChildren && nestedComments}
        </div>
    );
}

export default Comment;
