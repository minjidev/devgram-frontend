import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
        return useInfiniteQuery(
            ["feed"],
            ({ pageParam = 1 }) => {
                return fetchData(`${API_URL}?_page=${pageParam}&_limit=5`);
            },
            {
                // 더 불러올 데이터 있는지 판단
                getNextPageParam: (lastPage, allPages) => {
                    const maxPage = 20 / 5;
                    const nextPage = allPages.length + 1;
                    return nextPage <= maxPage ? nextPage : undefined;
                },
            }
        );
    } else if (sort) {
        return useInfiniteQuery(
            [`feed-${sort}`],
            ({ pageParam = 1 }) =>
                fetchData(`${baseURL}/${sort}?_page=${pageParam}&_limit=5`),
            {
                // 더 불러올 데이터 있는지 판단
                getNextPageParam: (lastPage, allPages) => {
                    const maxPage = 20 / 5;
                    const nextPage = allPages.length + 1;
                    return nextPage <= maxPage ? nextPage : undefined;
                },
            }
        );
    } else if (subTags.length) {
        const set = new Set(subTags);
        const tagsString = [...set].join(",");

        return useInfiniteQuery(
            [`feed-${subTags}`],
            ({ pageParam = 1 }) => {
                console.log(
                    `${baseURL}/${tagsString}?_page=${pageParam}&_limit=5`
                );
                return fetchData(
                    `${baseURL}/${tagsString}?_page=${pageParam}&_limit=5`
                );
            },
            {
                // 더 불러올 데이터 있는지 판단
                getNextPageParam: (lastPage, allPages) => {
                    const maxPage = 20 / 5;
                    const nextPage = allPages.length + 1;
                    return nextPage <= maxPage ? nextPage : undefined;
                },
            }
        );
    }
};
