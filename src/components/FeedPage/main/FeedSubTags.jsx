import React from "react";
import { useTagsBestData } from "@hooks/useFeedData";
import { TagLabel } from "@style";

function FeedSubTags({ selectedTag, setSelectedSubTags }) {
    const API_URL_TAGS = "http://localhost:3000/best";
    const {
        data: tags,
        isSuccess,
        isError,
        error,
    } = useTagsBestData(API_URL_TAGS);

    if (isError) return <div>{error}</div>;
    if (isSuccess && !selectedTag)
        return (
            <ul className="flex justify-center flex-wrap">
                {tags.map((tag) => (
                    <li key={tag.id}>
                        <input
                            className="sr-only peer"
                            type="checkbox"
                            value={tag.value}
                            name="tag"
                            id={tag.id}
                            onChange={(e) => {
                                console.log("e :", e.target);
                                console.log("checkd: ", e.target.checked);
                                // 체크되면 리스트에 넣기
                                if (e.target.checked) {
                                    setSelectedSubTags((prev) => [
                                        ...prev,
                                        tag.id,
                                    ]);
                                } else {
                                    setSelectedSubTags((prev) =>
                                        prev.filter((ch) => tag.id !== ch.id)
                                    );
                                }
                            }}
                        />
                        <TagLabel key={tag.id} htmlFor={tag.id}>
                            # {tag.name}
                        </TagLabel>
                    </li>
                ))}
            </ul>
        );
}

export default FeedSubTags;
