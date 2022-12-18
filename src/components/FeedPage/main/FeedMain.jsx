import React, { useState } from "react";
import FeedMainTags from "./FeedMainTags";
import FeedSubTags from "./FeedSubTags";
import FeedCards from "./FeedCards";
function FeedMain(props) {
    const [selectedTag, setSelectedTag] = useState(null);
    console.log(selectedTag);
    return (
        <div className="py-3 px-10 lg:px-32 flex flex-col items-center">
            <FeedMainTags setSelectedTag={setSelectedTag} />
            <FeedSubTags />
            <FeedCards selectedTag={selectedTag} />
            {/*<FeedAddButton />
        <MoveToTopButton /> */}
        </div>
    );
}

export default FeedMain;
