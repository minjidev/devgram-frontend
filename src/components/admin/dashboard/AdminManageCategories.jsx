import AdminManage from "@components/admin/dashboard/AdminManage";
import {
    useCategoriesData,
    useAddCategoryData,
    useEditCategoryData,
    useDeletecategoryData,
} from "@hooks/useCategoriesData";

function AdminManageCategories() {
    const categoryColumns = [
        { field: "name", header: "카테고리", initialVal: "" },
        { field: "color", header: "색상", initialVal: "" },
    ];
    return (
        <AdminManage
            title={"카테고리"}
            columns={categoryColumns}
            useData={() => useCategoriesData()}
            useAddData={useAddCategoryData}
            useEditData={useEditCategoryData}
            useDeleteData={useDeletecategoryData}
        />
    );
}

export default AdminManageCategories;
