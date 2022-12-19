import React, { useState } from "react";
import FeedMainTags from "./FeedMainTags";
import FeedSubTags from "./FeedSubTags";
import FeedCards from "./FeedCards";

function FeedMain(props) {
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedSubTags, setSelectedSubTags] = useState([]);
    console.log("selected: ", selectedSubTags);

    return (
        <div className="py-3 px-10 lg:px-32 flex flex-col items-center">
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
            {/*<FeedAddButton />
        <MoveToTopButton /> */}
        </div>
    );
}

export default FeedMain;
