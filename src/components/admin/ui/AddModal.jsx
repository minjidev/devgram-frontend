import React, { useState } from "react";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { TextInput } from "@style";
import { ModalContainer } from "@style";
import { useCategories } from "@context/CategoriesContext";

function AddModal({ visible, onClose, columns, useAddData }) {
    const init = {};
    const [data, setData] = useState(() => {
        columns.map((col) => (init[col.field] = col.initialVal));
        return init;
    });
    const [categorySelected, setCategorySelected] = useState("");
    const categories = useCategories();
    const { mutate, isSuccess } = useAddData();
    const [file, setFile] = useState(null);

    if (!visible) return null;

    const handleFile = (e) => {
        let file = e.target.files[0];
        setFile(file);
    };

    const getInputData = (e) => {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
    };
    // 상품 등록
    const handleSubmit = (e) => {
        e.preventDefault();
        // let formData = new FormData();
        // formData.append("file", file);
        // formData.append("product", data);

        mutate({ data: data, file: file });
        const newD = {};
        setData(() => {
            columns.map((col) => (newD[col.field] = col.initialVal));
            return newD;
        });
    };

    const handleCategoryClick = (e) => {
        setCategorySelected(e.target.dataset.value);
        setData({
            ...data,
            category_Seq: e.target.id,
        });
    };
    console.log("file", file);
    console.log("data: ", data);
    const handleClose = (e) => {
        if (e.target.id === "wrapper") onClose();
    };

    return (
        <ModalContainer id="wrapper" onClick={handleClose}>
            <div className="w-5/6 sm:max-w-sm min-h-1/4 bg-white p-2 rounded-[5px] flex flex-col">
                <button
                    className="place-self-end p-1"
                    onClick={() => onClose()}
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
                <div className="px-3 pt-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-5">
                        {columns[0].header} 추가
                    </h2>
                    <form className="pb-6" onSubmit={handleSubmit}>
                        {columns.map((col, index) => (
                            <div key={index} className="mb-4">
                                <label
                                    className="block text-gray-700 text-base font-bold"
                                    htmlFor="category"
                                >
                                    {col.header}
                                </label>
                                {/* 카테고리 드롭다운 */}
                                {col.field === "category_Seq" ? (
                                    <div className="dropdown">
                                        <label
                                            tabIndex={0}
                                            className="text-sm m-1 "
                                        >
                                            {categorySelected === ""
                                                ? "카테고리 선택"
                                                : categorySelected}
                                            <ChevronDownIcon className="w-4 h-4 inline-block mx-2" />
                                        </label>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-sm"
                                        >
                                            {categories.map((category) => (
                                                <li key={category.category_Seq}>
                                                    <div
                                                        id={
                                                            category.category_Seq
                                                        }
                                                        data-value={
                                                            category.name
                                                        }
                                                        onClick={
                                                            handleCategoryClick
                                                        }
                                                    >{`${category.category_Seq}. ${category.name}`}</div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : col.field === "img_url" ? (
                                    <div>
                                        <label htmlFor="" className="sr-only">
                                            파일 선택하기
                                        </label>
                                        <input
                                            type="file"
                                            name="file"
                                            accept="image/*"
                                            onChange={handleFile}
                                        ></input>
                                    </div>
                                ) : (
                                    <TextInput
                                        type="text"
                                        id={col.field}
                                        name={col.field}
                                        placeholder={`${col.header} 입력`}
                                        onChange={(e) => getInputData(e)}
                                        value={data[col.field]}
                                    />
                                )}
                            </div>
                        ))}

                        <div className="flex justify-end">
                            <button type="submit" className="btn">
                                확인
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ModalContainer>
    );
}

export default AddModal;
