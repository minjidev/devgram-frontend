import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

/** new 리뷰  **/
const fetchData = (API_URL) => {
    return axios.get(API_URL).then((res) => res.data);
};

/** custom hook  **/
export const useNewReviewsData = (API_URL) => {
    return useQuery(["reviews-new"], () => fetchData(API_URL));
};

export const useProductsBestData = (API_URL) => {
    return useQuery(["products-best"], () => fetchData(API_URL));
};

export const useFeedBestData = (API_URL) => {
    return useQuery(["feed-best"], () => fetchData(API_URL));
};
