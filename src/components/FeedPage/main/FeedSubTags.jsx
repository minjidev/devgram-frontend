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
                                // 체크되면 리스트에 넣기
                                if (e.target.checked) {
                                    setSelectedSubTags((prev) => [
                                        ...prev,
                                        tag.id,
                                    ]);
                                    // 체크 해제 되면 제거
                                } else {
                                    setSelectedSubTags((prev) =>
                                        prev.filter((ch) => tag.id !== ch)
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
