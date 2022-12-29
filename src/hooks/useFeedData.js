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
    baseURL: "http://52.194.161.226:8080/api",
});

const testAuth =
    "eyJqd3QiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJnaXRodWJ0ZXN0VXNlckBuYXZlci5jb20iLCJzdWIiOiJBVEsiLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNjcyMjg4MjU2LCJleHAiOjE2NzIyOTAwNTZ9.o-vz1wNeorIFJyLHXFfUFUi1wyX2amHhlemsqrVdMOY";

// 부모 댓글 추가
const addComments = ({ data }) => {
    return baseURL.post(
        `/comments`,
        {
            content: data.content,
            boardSeq: data.boardSeq,
            parentCommentSeq: null,
        },
        {
            headers: {
                Authentication: testAuth,
            },
        }
    );
};

// 자식 댓글 추가
const addChildrenComments = ({ data }) => {
    return baseURL.post(
        `/comments`,
        {
            content: data.content,
            boardSeq: data.boardSeq,
            parentCommentSeq: data.parentCommentSeq,
            commentGroup: data.commentGroup,
        },
        {
            headers: {
                Authentication: testAuth,
            },
        }
    );
};

// 신고 댓글 추가
const addReportedComments = ({ data }) => {
    return baseURL.post(
        "comments/accuse",
        {
            commentSeq: data.id,
            accuseReason: data.reason,
        },
        {
            headers: {
                Authentication: testAuth,
            },
        }
    );
};

// 댓글 수정
const editComments = (data) => {
    return baseURL.put(
        `/comments/content`,
        {
            commentSeq: data.commentSeq,
            content: data.content,
        },
        {
            headers: {
                Authentication: testAuth,
            },
        }
    );
};

// 댓글 삭제
const deleteComments = (id) => {
    return baseURL.delete(`/comments?commentSeq=${id}`, {
        headers: {
            Authorization: testAuth,
        },
    });
};

// 작성자 팔로우
const followWriter = (followingUserSeq) => {
    return baseURL.post(`/user/follow`, {
        FollowDto: {
            followingUserSeq: followingUserSeq,
        },
    });
};

// 피드 수정
const editFeed = ({ data, boardSeq }) => {
    return baseURL.put(
        `/boards`,
        {
            boardSeq: boardSeq,
            title: data.title,
            selfIntroduce: data.selfIntroduce,
            recommendReason: data.recommendReason,
            bestProduct: data.bestProduct,
            otherProduct: data.otherProduct,
            // last: data.last,
        }
        // {
        //     headers: {
        //         Authentication: testAuth,
        //     },
        // }
    );
};

// 피드 삭제
const deleteFeed = (id) => {
    return baseURL.delete(`/boards/${id}`, {
        headers: {
            Authentication: testAuth,
        },
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

export const useFeedCommentsData = (id, API_URL) => {
    return useInfiniteQuery(
        [`comments-${id}`],
        ({ pageParam = 1 }) =>
            fetchData(`${API_URL}?boardSeq=${id}&page=${pageParam}&size=5`),
        {
            getNextPageParam: (lastPage, allPages) => {
                const maxPage = 10 / 5;
                const nextPage = allPages.length + 1;
                return nextPage <= maxPage ? nextPage : undefined;
            },
        }
    );
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

// 자식 댓글 추가
export const useAddChildrenCommentsData = () => {
    const queryClient = useQueryClient();
    return useMutation(addChildrenComments, {
        // mutation 이 성공하면 실행
        onSuccess: () => {
            queryClient.invalidateQueries("child-comments");
        },
    });
};

// 신고 댓글 추가
export const useAddReportedCommentsData = () => {
    const queryClient = useQueryClient();
    return useMutation(addReportedComments, {
        // mutation 이 성공하면 실행
        onSuccess: () => {
            queryClient.invalidateQueries("reported-comments");
        },
    });
};

// 댓글 수정
export const useEditCommentsData = () => {
    const queryClient = useQueryClient();
    return useMutation(editComments, {
        // mutation 이 성공하면 실행
        onSuccess: () => {
            queryClient.invalidateQueries("comments");
        },
    });
};

// 댓글 삭제
export const useDeleteCommentsData = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteComments, {
        // mutation 이 성공하면 실행
        onSuccess: () => {
            queryClient.invalidateQueries("comments");
        },
    });
};

// 팔로잉
export const useFollowWriterData = () => {
    const queryClient = useQueryClient();
    return useMutation(followWriter, {
        // mutation 이 성공하면 실행
        onSuccess: () => {
            queryClient.invalidateQueries("following");
        },
    });
};

// 피드 수정
export const useEditFeedData = () => {
    const queryClient = useQueryClient();
    return useMutation(editFeed, {
        onSuccess: () => {
            queryClient.invalidateQueries("feed");
        },
    });
};

// 피드 삭제
export const useDeleteFeedData = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteFeed, {
        onSuccess: () => {
            queryClient.invalidateQueries("feed");
        },
    });
};
