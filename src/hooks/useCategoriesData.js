import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

/** baseURL **/
const baseURL = axios.create({
    baseURL: "http://52.194.161.226:8080/api",
});

const fetchData = (API_URL) => {
    return baseURL.get(API_URL).then((res) => res.data);
};

/** 카테고리 추가,수정,삭제 **/
const addCategory = ({ data }) => {
    return baseURL.post("/categories", { name: data.name, color: data.color });
};

const updateCategory = ({ id, editedData }) => {
    return baseURL.put(`/categories`, {
        name: editedData.name,
        color: editedData.color,
    });
};

const deleteCategory = ({ id }) => {
    return baseURL.delete(`/categories/delete`, id);
};

/** 상품 추가,수정,삭제 **/
const addProduct = ({ data }) => {
    return baseURL.post("/products", {
        title: data.title,
        content: data.content,
        hits: data.hits,
        rating: data.rating,
        like_count: data.like_count,
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

/** 신고 수정 **/
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

export const useReportedCommentsData = () => {
    return useQuery(["reported-comments"], () => fetchData("/comments/accuse"));
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
    return useQuery(["reported-reviews-detail"], () =>
        fetchData("/comments/accuse")
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
