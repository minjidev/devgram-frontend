import {
    useInfiniteQuery,
    useQuery,
    useQueryClient,
    useMutation,
} from "@tanstack/react-query";
import axios from "axios";

/** 태그 **/
/** baseURL **/
const baseURL = axios.create({
    baseURL: "http://localhost:3000",
});

// 댓글 추가
const addComments = ({ data }) => {
    return baseURL.post(`/commentData`, {
        id: data.id,
        text: data.text,
        author: data.author,
        children: data.children,
    });
};
/** custom hooks **/

const fetchData = (API_URL) => {
    return baseURL.get(API_URL).then((res) => res.data);
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

export const useFeedDetailData = (id, API_URL) => {
    return useQuery([`detail-${id}`], () => fetchData(`${API_URL}/${id}`));
};

// 보드 id 넘겨주도록 변경 필요
export const useFeedCommentsData = (id, API_URL) => {
    return useQuery([`comments-${id}`], () => fetchData(`${API_URL}`));
};

// 댓글 추가
export const useAddCommentsData = () => {
    const queryClient = useQueryClient();
    return useMutation(addComments, {
        // mutation 이 성공하면 실행
        onSuccess: () => {
            queryClient.invalidateQueries("comments");
        },
    });
};
