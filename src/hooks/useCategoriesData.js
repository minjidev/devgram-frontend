import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

/** baseURL **/
const baseURL = axios.create({
    baseURL: "http://52.194.161.226:8080/api",
});


const testAuth = localStorage.getItem("webAccessToken")

const fetchData = (API_URL) => {
    return baseURL.get(API_URL).then((res) => res.data);
};

const fetchDataAdmin = (API_URL) => {
    return baseURL
        .get(API_URL, {
            headers: {
                Authentication: testAuth,
            },
        })
        .then((res) => res.data);
};

/** 카테고리 추가,수정,삭제 **/
const addCategory = ({ data }) => {
    return baseURL.post(
        "/categories/admin",
        { name: data.name, color: data.color },
        {
            headers: {
                Authentication: testAuth,
            },
        }
    );
};

const updateCategory = ({ id, editedData }) => {
    return baseURL.post(
        `/categories/update/admin`,
        {
            category_Seq: id,
            name: editedData.name,
            color: editedData.color,
        },
        {
            headers: {
                Authentication: testAuth,
            },
        }
    );
};

const deleteCategory = ({ id }) => {
    return baseURL.post(
        `/categories/delete/admin`,
        {
            category_Seq: id,
        },
        {
            headers: {
                Authentication: testAuth,
            },
        }
    );
};

/** 상품 추가,수정,삭제 **/
const addProduct = ({ data }) => {
    return baseURL.post("/products", {
        category_Seq: data.category_Seq,
        title: data.title,
        content: data.content,
        price: data.price,
    });
};

const updateProduct = ({ id, editedData }) => {
    return baseURL.post(
        `/products/update/admin`,
        {
            product_Seq: id,
            category_Seq: editedData.category_Seq,
            title: editedData.title,
            content: editedData.content,
            price: editedData.price,
            status: editedData.status,
        },
        {
            headers: {
                Authentication: testAuth,
            },
        }
    );
};

// 상품 상태 업데이트
const editProductStatus = ({ data, status }) => {
    return baseURL.post(
        `/products/update/admin`,
        {
            product_Seq: data.product_Seq,
            category_Seq: data.category_Seq,
            price: data.price,
            title: data.title,
            content: data.content,
            status: status,
        },
        {
            headers: {
                Authentication: testAuth,
            },
        }
    );
};

const deleteProduct = ({ id }) => {
    return baseURL.post(
        `/products/delete/admin`,
        {
            product_Seq: id,
        },
        {
            headers: {
                Authentication: testAuth,
            },
        }
    );
};

/** 댓글 신고 수정 **/
const updateReportedComment = ({ id, status }) => {
    return baseURL.put(
        `/comments/status/admin`,
        {
            commentSeq: id,
            commentStatus: status,
        },
        {
            headers: {
                Authentication: testAuth,
            },
        }
    );
};

/** 리뷰 수정 **/
const updateReportedReviews = ({ id, status }) => {
    return baseURL.post(
        `/review/accuse/statusUpdate/admin`,
        {
            reviewSeq: id,
            status: status,
        },
        {
            headers: {
                Authentication: testAuth,
            },
        }
    );
};

/* custom hooks */
export const useCategoriesData = () => {
    return useQuery(["categories"], () => fetchDataAdmin("/categories/admin"));
};

export const useCategoriesDataAll = () => {
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
    return useQuery(["products"], () => fetchDataAdmin("/products/admin"));
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
// 상품 상태 수정
export const useEditProductsStatusData = () => {
    const queryClient = useQueryClient();
    return useMutation(editProductStatus, {
        onSuccess: () => {
            queryClient.invalidateQueries("products-status");
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
        fetchDataAdmin("/comments/accuse/admin")
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
        fetchDataAdmin("/review/accuse/list/admin")
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
