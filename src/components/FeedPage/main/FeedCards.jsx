import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useFeedData } from "@hooks/useFeedData";
import Loader from "@components/products/ui/Loader";
import FeedCard from "./ui/FeedCard";

function FeedCards({ selectedTag, selectedSubTags }) {
    const { ref: targetRef, inView } = useInView();
    const API_URL_FEED = "http://localhost:3000/feed";
    const {
        data: feedData,
        status,
        hasNextPage,
        fetchNextPage,
    } = useFeedData(API_URL_FEED, selectedTag, selectedSubTags) || [];
    useEffect(() => {
        // 다음 페이지가 있는 경우
        if (inView && hasNextPage) {
            // fetchNextPage fetch callback 함수를 실행
            fetchNextPage();
        }
    }, [inView]);

    if (status === "error") return <div>Error...</div>;
    // feed에 페이지된 데이터만 넘겨주기
    return (
        <>
            {status === "loading" ? (
                <Loader />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-10 p-10">
                        {feedData?.pages?.map((page) =>
                            page.map((feed) => (
                                <FeedCard feed={feed} key={feed.id} />
                            ))
                        )}
                    </div>
                    <div className="h-1" ref={targetRef}></div>
                </>
            )}
        </>
    );
}

export default FeedCards;
