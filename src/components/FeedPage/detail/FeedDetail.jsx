import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function FeedDetail(props) {
    const { id } = useParams();
    const API_URL_FEED_DET = "";
    // const feed = axios.get(`${API_URL_FEED_DET}/${id}`).then((res) => res.data);

    return <div className="px-10 lg:px-32">{id}</div>;
}

export default FeedDetail;
