import React, { useState } from "react";
import { useNewReviewsData } from "@hooks/useMainData";
import ReviewRecentCard from "@components/MainPage/Main/ReviewRecentCard";

function ReviewsRecent(props) {
    const API_URL_REVIEWS_RECENT = "http://localhost:3000/new";
    const { data, isLoading, error } = useNewReviewsData(
        API_URL_REVIEWS_RECENT
    );
    console.log("data: ", data);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col py-3 px-10">
            <h2 className="text-lg font-bold">NEW 리뷰</h2>
            <div className="py-3 flex justify-between w-screen gap-x-2 overflow-x-auto">
                {data.map((card) => (
                    <div key={card.id} className="max-w-[200px] sm:w-[18%] ">
                        <ReviewRecentCard card={card} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewsRecent;
