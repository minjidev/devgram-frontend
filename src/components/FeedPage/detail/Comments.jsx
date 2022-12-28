import React, { useState } from "react";
import {
    useAddReportedCommentsData,
    useAddChildrenCommentsData,
} from "@hooks/useFeedData";
import CommentChildren from "./CommentChildren";
import CommentParent from "./CommentParent";

function Comments({ comment }) {
    const [showChildren, setShowChildren] = useState(false);

    //부모 + 자식 댓글
    return (
        <div className="ml-5 mb-5">
            {/* 각 댓글 */}
            <CommentParent
                comment={comment}
                setShowChildren={setShowChildren}
            />
            {comment.includedCommentList.map(
                (children) =>
                    showChildren && (
                        <CommentChildren
                            comment={children}
                            key={children.commentSeq}
                        />
                    )
            )}
        </div>
    );
}

export default Comments;
