import React, { useState } from "react";
import { useEditFeedData } from "@hooks/useFeedData";
import { ModalContainer } from "@style";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { TextInput } from "@style";

function EditModal({ visible, onClose, feedData, boardSeq }) {
    const columns = [
        {
            field: "title",
            header: "제목",
            initialValue: feedData.title,
        },
        {
            field: "selfIntroduce",
            header: "자기소개",
            initialValue: feedData.intro,
        },
        {
            field: "bestProduct",
            header: "베스트 추천 장비",
            initialValue: feedData.productsBest,
        },
        {
            field: "otherProduct",
            header: "기타 추천 장비",
            initialValue: feedData.productsRecommend,
        },
        {
            field: "recommendReason",
            header: "추천 이유",
            initialValue: feedData.productsRecommendReason,
        },
        {
            field: "last",
            header: "마지막 하고 싶은 말",
            initialValue: feedData.last,
        },
    ];
    const init = {};
    const [data, setData] = useState(() => {
        columns.map((col) => (init[col.field] = col.initialValue));
        return init;
    });

    const { mutate: editFeed } = useEditFeedData();
    if (!visible) return null;

    const getInputData = (e) => {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editFeed({ data: data, boardSeq: boardSeq });
    };

    const handleClose = (e) => {
        if (e.target.id === "wrapper") onClose();
    };

    return (
        <ModalContainer id="wrapper" onClick={handleClose}>
            <div className="w-5/6 sm:max-w-sm min-h-1/4 bg-white px-6 pt-2 rounded-[5px] flex flex-col">
                <button
                    className="place-self-end p-1"
                    onClick={() => onClose()}
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-5">
                        피드 수정
                    </h2>
                    <form className="pb-6" onSubmit={handleSubmit}>
                        {columns.map((col, index) => (
                            <div key={index} className="mb-4">
                                <label
                                    className="block text-gray-700 text-base font-bold"
                                    htmlFor={col.field}
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
                            <button
                                type="submit"
                                className="btn bg-point-blue border-0 hover:bg-point-blue"
                            >
                                수정
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ModalContainer>
    );
}

export default EditModal;
