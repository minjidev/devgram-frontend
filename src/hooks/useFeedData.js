import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/** 태그 **/
const fetchData = (API_URL) => {
    return axios.get(API_URL).then((res) => res.data);
};

export const useTagsBestData = (API_URL) => {
    return useQuery(["tags-best"], () => fetchData(API_URL));
};
