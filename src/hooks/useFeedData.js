import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseURL = "http://localhost:3000";
/** 태그 **/
const fetchData = (API_URL) => {
    return axios.get(API_URL).then((res) => res.data);
};

export const useTagsBestData = (API_URL) => {
    return useQuery(["tags-best"], () => fetchData(API_URL));
};

export const useFeedData = (API_URL, sort, subTags) => {
    if (!sort && !subTags.length) {
        return useQuery(["feed"], () => fetchData(API_URL));
    } else if (sort) {
        return useQuery([`feed-${sort}`], () =>
            fetchData(`${baseURL}/${sort}`)
        );
    } else if (subTags.length) {
        const set = new Set(subTags);
        const tagsString = [...set].join(",");
        console.log(`${baseURL}/${tagsString}`);
        return useQuery(["feed-tags"], () =>
            fetchData(`${baseURL}/${tagsString}`)
        );
    }
};
