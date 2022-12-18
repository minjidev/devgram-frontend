import React from "react";
import FeedMainTags from "./FeedMainTags";
import FeedSubTags from "./FeedSubTags";
function FeedMainView(props) {
    return (
        <div className="py-3 px-10 lg:px-32 flex flex-col items-center">
            <FeedMainTags />
            <FeedSubTags />
            {/*<FeedCards />
            <FeedAddButton />
            <MoveToTopButton /> */}
        </div>
    );
}

export default FeedMainView;
