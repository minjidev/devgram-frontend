import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TextInput } from "@style";
import { ModalContainer } from "@style";

function AddModal({ visible, onClose, columns, useAddData }) {
    const init = {};
    const [data, setData] = useState(() => {
        columns.map((col) => (init[col.field] = col.initialVal));
        return init;
    });

    const { mutate, isSuccess } = useAddData();
    if (!visible) return null;

    const getInputData = (e) => {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({ data: data });
        isSuccess &&
            setData((prev) => {
                columns.map((col) => (prev[col.field] = col.initialVal));
                return data;
            });
    };

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
                                <TextInput
                                    type="text"
                                    id={col.field}
                                    name={col.field}
                                    placeholder={`${col.header} 입력`}
                                    onChange={(e) => getInputData(e)}
                                    value={data[col.field]}
                                />
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
