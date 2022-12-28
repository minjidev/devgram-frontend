import React from "react";
import { TagLabel } from "@style";

function FeedMainTags({ setSelectedTag, selectedSubTags }) {
    const tags = [
        { id: 1, title: "인기", value: "popular" },
        { id: 2, title: "최신", value: "recent" },
        { id: 3, title: "팔로잉", value: "following" },
    ];

    const checkClicked = (e) => {
        setSelectedTag(e.target.value);
    };

    if (!selectedSubTags.length)
        return (
            <ul className="flex justify-center">
                {tags.map((tag) => (
                    <li key={tag.id}>
                        <input
                            className="sr-only peer"
                            type="radio"
                            value={tag.value}
                            name="tag"
                            id={tag.id}
                            onChange={checkClicked}
                        />
                        <TagLabel
                            key={tag.id}
                            htmlFor={tag.id}
                            className="border-none text-sm hover:transition-colors"
                        >
                            # {tag.title}
                        </TagLabel>
                    </li>
                ))}
            </ul>
        );
}

export default FeedMainTags;
