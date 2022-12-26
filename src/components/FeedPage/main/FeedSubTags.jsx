import React from "react";
import { useTagsBestData } from "@hooks/useFeedData";
import { TagLabel } from "@style";

function FeedSubTags({ selectedTag, setSelectedSubTags }) {
    const API_URL_TAGS = "http://52.194.161.226:8080/api/tags/popular";
    const {
        data: tags,
        isSuccess,
        isError,
        error,
    } = useTagsBestData(API_URL_TAGS);

    if (isError) return <div>{error}</div>;
    console.log("tags: ", tags);
    console.log("selected tag: ", selectedTag);
    if (isSuccess && selectedTag !== "")
        return (
            <ul className="flex justify-center flex-wrap">
                {tags.map((tag) => (
                    <li key={tag.tagSeq}>
                        <input
                            className="sr-only peer"
                            type="checkbox"
                            value={tag.name}
                            name="tag"
                            id={tag.tagSeq}
                            onChange={(e) => {
                                // 체크되면 리스트에 넣기
                                if (e.target.checked) {
                                    setSelectedSubTags((prev) => [
                                        ...prev,
                                        tag.tagSeq,
                                    ]);
                                    // 체크 해제 되면 제거
                                } else {
                                    setSelectedSubTags((prev) =>
                                        prev.filter((ch) => tag.tagSeq !== ch)
                                    );
                                }
                            }}
                        />
                        <TagLabel key={tag.tagSeq} htmlFor={tag.tagSeq}>
                            # {tag.name}
                        </TagLabel>
                    </li>
                ))}
            </ul>
        );
}

export default FeedSubTags;
