import React from "react";
import { TagLabel } from "@style";

function FeedMainTags() {
    const tags = [
        { id: 1, title: "인기", url: "" },
        { id: 2, title: "최신", url: "" },
        { id: 3, title: "팔로잉", url: "" },
    ];
    return (
        <div className="flex justify-center">
            {tags.map((tag) => (
                <TagLabel key={tag.id}># {tag.title}</TagLabel>
            ))}
        </div>
    );
}

export default FeedMainTags;
