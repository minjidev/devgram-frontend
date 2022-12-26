import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseURL = "http://52.194.161.226:8080/api/boards";
/** 태그 **/
const fetchData = (API_URL) => {
    return axios.get(API_URL).then((res) => res.data);
};

export const useTagsBestData = (API_URL) => {
    return useQuery(["tags-best"], () => fetchData(API_URL));
};

export const useFeedData = (API_URL, sort, subTags) => {
    // 메인이나 서브태그 선택하지 않은 경우
    if (!sort && !subTags.length) {
        return useInfiniteQuery(
            ["feed"],
            ({ pageParam = 0 }) => {
                return fetchData(`${API_URL}?page=${pageParam}?size=5`);
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
        // 메인 태그 선택한 경우
    } else if (sort) {
        console.log("here");
        return useInfiniteQuery(
            [`feed-${sort}`],
            ({ pageParam = 0 }) => {
                if (sort === "follow") {
                    return fetchData(
                        `${baseURL}/${sort}?page=${pageParam}?size=5`
                    );
                } else {
                    return fetchData(
                        `${baseURL}?page=${pageParam}&size=5&sort=${sort}`
                    );
                }
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
        // 서브 태그 선택한 경우
    } else if (subTags.length) {
        const set = new Set(subTags);
        const tagsString = [...set].join(",");

        return useInfiniteQuery(
            [`feed-${subTags}`],
            ({ pageParam = 0 }) => {
                console.log(
                    `${baseURL}/?page=${pageParam}&size=5&tagSeqList=${tagsString}`
                );
                return fetchData(
                    `${baseURL}/?page=${pageParam}&size=5&tagSeqList=${tagsString}`
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
