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

/* custom hooks */
export const useCategoriesData = () => {
    return useQuery(["categories"], fetchCategories);
};

export const useAddCategoryData = () => {
    const queryClient = useQueryClient();
    return useMutation(addCategory, {
        // mutation 이 성공하면 실행
        onSuccess: (data) => {
            queryClient.invalidateQueries("categories");
            // update query cache
            // queryClient.setQueryData("categories", (prevData) => {
            //     return [...prevData, data];
            // });
        },
    });
};
