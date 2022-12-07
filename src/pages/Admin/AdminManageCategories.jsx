import AdminManage from "@components/Admin/AdminManage";
import {
    useCategoriesData,
    useAddCategoryData,
    useEditCategoryData,
    useDeletecategoryData,
} from "@hooks/useCategoriesData";

function AdminManageCategories() {
    const API_URL_CATEGORY = "http://localhost:3000/category";
    const categoryColumns = [
        { field: "name", header: "카테고리", initialVal: "" },
        { field: "color", header: "색상", initialVal: "" },
    ];
    return (
        <AdminManage
            title={"카테고리"}
            columns={categoryColumns}
            useData={() => useCategoriesData(API_URL_CATEGORY)}
            useAddData={useAddCategoryData}
            useEditData={useEditCategoryData}
            useDeleteData={useDeletecategoryData}
        />
    );
}

export default AdminManageCategories;
