import React from "react";
import { useParams } from "react-router-dom";

function FeedDetail(props) {
    const { id } = useParams();
    return <div className="">{id}</div>;
}

export default FeedDetail;
