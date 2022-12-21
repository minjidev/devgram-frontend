import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

/** baseURL **/
const baseURL = axios.create({
    baseURL: "http://localhost:3000",
});

const fetchData = (API_URL) => {
    return baseURL.get(API_URL).then((res) => res.data);
};

/** 카테고리 추가,수정,삭제 **/
const addCategory = ({ data }) => {
    return baseURL.post("/category", { name: data.name, color: data.color });
};

const updateCategory = ({ id, editedData }) => {
    return baseURL.put(`/category/${id}`, {
        name: editedData.name,
        color: editedData.color,
    });
};

const deleteCategory = ({ id }) => {
    return baseURL.delete(`/category/${id}`, id);
};

/** 상품 추가,수정,삭제 **/
const addProduct = ({ data }) => {
    return baseURL.post("/product", {
        title: data.title,
        content: data.content,
        hits: data.hits,
        rating: data.rating,
        like_count: data.like_count,
        price: data.price,
    });
};

const updateProduct = ({ id, editedData }) => {
    return baseURL.put(`/product/${id}`, {
        title: editedData.title,
        content: editedData.content,
        price: editedData.price,
    });
};

const deleteProduct = ({ id }) => {
    return baseURL.delete(`/product/${id}`, id);
};

/** 신고 수정 **/
const updateReportedComment = ({ id, status }) => {
    return baseURL.patch(`report/${id}`, {
        status: status,
    });
};
const updateReportedReviews = ({ id, status }) => {
    return baseURL.patch(`reportreviews/${id}`, {
        status: status,
    });
};

/* custom hooks */
export const useCategoriesData = () => {
    return useQuery(["categories"], () => fetchData("/category"));
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
    return useQuery(["products"], () => fetchData("product"));
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
    return useQuery(["reported-comments"], () => fetchData("/report"));
};

export const useEditReportedCommentsData = () => {
    const queryClient = useQueryClient();
    return useMutation(updateReportedComment, {
        onSuccess: () => {
            queryClient.invalidateQueries("reported-comments");
        },
    });
};

// export const useReportedCommentsDataDetail = (API_URL) => {
//     return useQuery(["reported-comments-detail"], () => fetchData(API_URL));
// };

export const useReportedReivewsData = () => {
    return useQuery(["reported-reviews-detail"], () =>
        fetchData("/reportreviews")
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
