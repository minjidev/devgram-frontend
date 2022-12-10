import React, { useState } from "react";
import { TabButton } from "@style";

function Tabs({ toggledTab, setToggledTab }) {
    // const [toggledTab, setToggledTab] = useState(1);
    return (
        <ul className="flex flex-wrap text-sm font-medium text-center items-center max-h-12 mb-6 text-gray-500 border-b border-gray-200">
            <li>
                <TabButton
                    onClick={() => setToggledTab(1)}
                    className={`${
                        toggledTab === 1 &&
                        "font-bold text-blue-600 border-b-4 hover:text-blue-600 hover:bg-white"
                    }`}
                >
                    리뷰
                </TabButton>
            </li>
            <li>
                <TabButton
                    onClick={() => setToggledTab(2)}
                    className={`${
                        toggledTab === 2 &&
                        "font-bold text-blue-600 border-b-4 hover:text-blue-600 hover:bg-white"
                    }`}
                >
                    댓글
                </TabButton>
            </li>
        </ul>
    );
}

export default Tabs;
