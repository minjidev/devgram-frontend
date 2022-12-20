import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL_CATEGORY = "http://localhost:3000/category";
const API_URL_PRODUCT = "http://localhost:3000/product";
const API_URL_REPORT = "http://localhost:3000/report";
const API_URL_REPORT_REVIEWS = "http://localhost:3000/reportreivews";

/** 카테고리 추가,수정,삭제 **/
const fetchData = (API_URL) => {
    return axios.get(API_URL).then((res) => res.data);
};

const addCategory = ({ data }) => {
    return axios.post(API_URL_CATEGORY, { name: data.name, color: data.color });
};

const updateCategory = ({ id, editedData }) => {
    return axios.put(`${API_URL_CATEGORY}/${id}`, {
        name: editedData.name,
        color: editedData.color,
    });
};

const deleteCategory = ({ id }) => {
    return axios.delete(`${API_URL_CATEGORY}/${id}`, id);
};

/** 상품 추가,수정,삭제 **/
const addProduct = ({ data }) => {
    return axios.post(API_URL_PRODUCT, {
        title: data.title,
        content: data.content,
        hits: data.hits,
        rating: data.rating,
        like_count: data.like_count,
        price: data.price,
    });
};

const updateProduct = ({ id, editedData }) => {
    return axios.put(`${API_URL_PRODUCT}/${id}`, {
        title: editedData.title,
        content: editedData.content,
        hits: editedData.hits,
        rating: editedData.rating,
        like_count: editedData.like_count,
        price: editedData.price,
    });
};

const deleteProduct = ({ id }) => {
    return axios.delete(`${API_URL_PRODUCT}/${id}`, id);
};

/** 신고 수정 **/
const updateReportedComment = ({ id, status }) => {
    return axios.patch(`${API_URL_REPORT}/${id}`, {
        status: status,
    });
};
const updateReportedReviews = ({ id, status }) => {
    return axios.patch(`${API_URL_REPORT_REVIEWS}/${id}`, {
        status: status,
    });
};

/* custom hooks */
export const useCategoriesData = (API_URL) => {
    return useQuery(["categories"], () => fetchData(API_URL));
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

export const useProductsData = (API_URL) => {
    return useQuery(["products"], () => fetchData(API_URL));
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

export const useReportedCommentsData = (API_URL) => {
    return useQuery(["reported-comments"], () => fetchData(API_URL));
};

export const useEditReportedCommentsData = () => {
    const queryClient = useQueryClient();
    return useMutation(updateReportedComment, {
        onSuccess: () => {
            queryClient.invalidateQueries("reported-comments");
        },
    });
};

export const useReportedCommentsDataDetail = (API_URL) => {
    return useQuery(["reported-comments-detail"], () => fetchData(API_URL));
};

export const useReportedReivewsData = (API_URL) => {
    return useQuery(["reported-reviews-detail"], () => fetchData(API_URL));
};

export const useEditReportedReviewsData = () => {
    const queryClient = useQueryClient();
    return useMutation(updateReportedReviews, {
        onSuccess: () => {
            queryClient.invalidateQueries("reported-comments");
        },
    });
};

/** 캐러셀  **/
export const useProductsCarouselData = (API_URL) => {
    return useQuery(["products-carousel"], () => fetchData(API_URL));
};
