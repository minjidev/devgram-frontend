import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

/** baseURL **/
const baseURL = axios.create({
    baseURL: "http://52.194.161.226:8080/api",
});

const testAuth =
    "eyJqd3QiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJnaXRodWJBRE1JTiIsInN1YiI6IkFUSyIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNjcyMjI4MjUwLCJleHAiOjE2NzIyMzAwNTB9.E95Cg4bRuafnejXaL3E_PIcf4hOFAozUdMfz3cYOpbk";
// "eyJqd3QiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJnaXRodWJ0ZXN0VXNlckBuYXZlci5jb20iLCJzdWIiOiJBVEsiLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNjcyMjE5MjAxLCJleHAiOjE2NzIyMjEwMDF9.3awTgUnt2kEVmXK24uSp5ByhyA8ljtyFA7Z0yahSXYY";
// "eyJqd3QiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJnaXRodWJ1c2VyIiwic3ViIjoiQVRLIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTY3MjIxMTkzMSwiZXhwIjoxNjcyMjEzNzMxfQ.OPHOAwRV9WAqiEEs3T1xnF3cxj3UyEYct2Dhvg_gd1g";

const fetchData = (API_URL) => {
    return baseURL.get(API_URL).then((res) => res.data);
};

/** 카테고리 추가,수정,삭제 **/
const addCategory = ({ data }) => {
    return baseURL.post("/categories", { name: data.name, color: data.color });
};

const updateCategory = ({ id, editedData }) => {
    return baseURL.post(`/categories`, {
        category_Seq: id,
        name: editedData.name,
        color: editedData.color,
    });
};

const deleteCategory = ({ id }) => {
    return baseURL.post(`/categories/delete`, {
        category_Seq: id,
    });
};

/** 상품 추가,수정,삭제 **/
const addProduct = ({ data }) => {
    return baseURL.post("/products", {
        category_Seq: data.category_Seq,
        title: data.title,
        content: data.content,
        // hits: data.hits,
        // rating: data.rating,
        // like_count: data.like_count,
        price: data.price,
    });
};

const updateProduct = ({ id, editedData }) => {
    return baseURL.put(`/products`, {
        title: editedData.title,
        content: editedData.content,
        price: editedData.price,
    });
};

const deleteProduct = ({ id }) => {
    return baseURL.delete(`/products`, id);
};

/** 댓글 신고 수정 **/
const updateReportedComment = ({ id, status }) => {
    return baseURL.patch(`/comments/status`, {
        commentSeq: id,
        commentStatus: status,
    });
};

/** 리뷰 수정 URL 변경 필요  **/
const updateReportedReviews = ({ id, status }) => {
    return baseURL.patch(`/reviews/status`, {
        reviewSeq: id,
        reviewStatus: status,
    });
};

/* custom hooks */
export const useCategoriesData = () => {
    return useQuery(["categories"], () => fetchData("/categories"));
};

export const useAddCategoryData = () => {
    const queryClient = useQueryClient();
    return useMutation(addCategory, {
        // mutation 이 성공하면 실행
        onSuccess: () => {
            queryClient.invalidateQueries("categories");
            // update query cache
            // queryClient.setQueryData("categories", (prevData) => {
            //     return [...prevData, data];
            // });
        },
    });
};

export const useEditCategoryData = () => {
    const queryClient = useQueryClient();
    return useMutation(updateCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries("categories");
        },
    });
};

export const useDeletecategoryData = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries("categories");
        },
    });
};

export const useProductsData = () => {
    return useQuery(["products"], () => fetchData("/products/admin"));
};

export const useProductsDataAll = () => {
    return useQuery(["products-all"], () => fetchData("/products/lists"));
};

/** 캐러셀  **/
export const useProductsCarouselData = (API_URL) => {
    return useQuery(["products-carousel"], () => fetchData(API_URL));
};

export const useAddProductData = () => {
    const queryClient = useQueryClient();
    return useMutation(addProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries("products");
        },
    });
};

export const useEditProductData = () => {
    const queryClient = useQueryClient();
    return useMutation(updateProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries("products");
        },
    });
};
export const useDeleteProductData = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries("products");
        },
    });
};

/** 신고 댓글 **/
export const useReportedCommentsData = () => {
    return useQuery(["reported-comments"], () =>
        baseURL
            .get("/comments/accuse/admin", {
                headers: {
                    Authentication: testAuth,
                },
            })
            .then((res) => res.data)
    );
};

export const useEditReportedCommentsData = () => {
    const queryClient = useQueryClient();
    return useMutation(updateReportedComment, {
        onSuccess: () => {
            queryClient.invalidateQueries("reported-comments");
        },
    });
};

/** 신고 리뷰 **/
export const useReportedReivewsData = () => {
    return useQuery(["reported-reviews"], () =>
        fetchData("/review/accuse/list")
    );
};

export const useEditReportedReviewsData = () => {
    const queryClient = useQueryClient();
    return useMutation(updateReportedReviews, {
        onSuccess: () => {
            queryClient.invalidateQueries("reported-reviews");
        },
    });
};
