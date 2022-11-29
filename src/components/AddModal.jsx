import React, { useState } from "react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";

function AddModal({ visible, onClose }) {
    if (!visible) return null;
    const API_URL = "";
    const [data, setData] = useState({
        category: "",
        color: "",
    });

    const getInputData = (e) => {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(API_URL, {
                category: data.category,
                color: data.color,
            })
            .then((response) => {
                console.log(response.data);
            });
    };

    const handleClose = (e) => {
        if (e.target.id === "wrapper") onClose();
    };

    return (
        <div
            id="wrapper"
            className="fixed inset-0 flex justify-center 
        backdrop-blur-xs items-center bg-black bg-opacity-25 z-50"
            onClick={handleClose}
        >
            <div className="w-1/2 h-1/2 bg-white p-2 rounded-[5px] flex flex-col">
                <button
                    className="place-self-end p-1"
                    onClick={() => onClose()}
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
                <div className="px-3 pt-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-5">
                        카테고리 추가
                    </h2>
                    <form className="pb-6" onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-base font-bold"
                                htmlFor="category"
                            >
                                카테고리
                            </label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                placeholder="카테고리 입력"
                                required
                                className="h-10 text-thin text-sm border rounded w-full p-3 mt-2 outfocus:outline-0 focus:outline-gray-300"
                                onChange={(e) => getInputData(e)}
                                value={data.category}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-base font-bold"
                                htmlFor="color"
                            >
                                색상
                            </label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                placeholder="색상 입력"
                                required
                                className="h-10 text-thin text-sm border rounded w-full p-3 mt-2 outfocus:outline-0 focus:outline-gray-300"
                                onChange={(e) => getInputData(e)}
                                value={data.color}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button className="btn">확인</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddModal;
