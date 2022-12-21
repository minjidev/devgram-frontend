import React, { useState } from "react";
import FeedMainTags from "./FeedMainTags";
import FeedSubTags from "./FeedSubTags";
import FeedCards from "./FeedCards";
import FeedAddButton from "@components/FeedPage/main/ui/FeedAddButton";
import MoveToTopButton from "@components/FeedPage/main/ui/MoveToTopButton";

function FeedMain(props) {
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedSubTags, setSelectedSubTags] = useState([]);
    const [showButton, setShowButton] = useState(false);
    return (
        <div className="py-3 px-10 lg:px-32 flex flex-col items-center test">
            <FeedMainTags
                setSelectedTag={setSelectedTag}
                selectedSubTags={selectedSubTags}
            />
            <FeedSubTags
                selectedTag={selectedTag}
                setSelectedSubTags={setSelectedSubTags}
            />
            <FeedCards
                selectedTag={selectedTag}
                selectedSubTags={selectedSubTags}
            />
            <div className="fixed bottom-10 right-14 flex gap-3">
                <FeedAddButton />
                <MoveToTopButton />
            </div>
        </div>
    );
}

export default FeedMain;
