import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:3000/category";

// 카테고리 Get
const fetchCategories = () => {
    return axios.get(API_URL).then((res) => res.data);
};

// 카테고리 Post
const addCategory = (data) => {
    return axios.post(API_URL, { name: data.category, color: data.color });
};

// 카테고리 put : 수정할 내용만 보내기
const updateCategory = ({ id, editedData }) => {
    return axios.put(`${API_URL}/${id}`, {
        name: editedData.category,
        color: editedData.color,
    });
};

// 카테고리 delete
const deleteCategory = ({ id }) => {
    return axios.delete(`${API_URL}/${id}`, id);
};

/* custom hooks */
export const useCategoriesData = () => {
    return useQuery(["categories"], fetchCategories);
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
