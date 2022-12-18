import React from "react";
import { useTagsBestData } from "@hooks/useFeedData";
import { TagLabel } from "@style";

function FeedSubTags(props) {
    const API_URL_TAGS = "http://localhost:3000/best";
    const {
        data: tags,
        isSuccess,
        isError,
        error,
    } = useTagsBestData(API_URL_TAGS);
    if (isError) return <div>{error}</div>;
    if (isSuccess)
        return (
            <div className="flex justify-center flex-wrap">
                {tags.map((tag) => (
                    <TagLabel key={tag.id}>#{tag.name}</TagLabel>
                ))}
            </div>
        );
}

export default FeedSubTags;
