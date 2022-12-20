import tw from "tailwind-styled-components";

export const SearchContainer = tw.div`
flex 
items-center 
justify-between 
w-full max-w-lg 
text-base 
text-normal 
focus-within:text-gray-800
`;

export const SearchInput = tw.input`
    bg-gray-100 
    p-3 
    pl-10 
    h-10 
    text-sm
    font-normal
    sm:text-base 
    rounded-xl 
    flex-1 
    w-full 
    text-black
    outfocus:outline-0 focus:outline-gray-300
`;

export const TableContainer = tw.table`
    table 
    whitespace-wrap
    w-full 
    max-w-lg 
    my-3 
    text-base 
    font-normal
`;

export const TextInput = tw.input`
    h-10 
    text-thin 
    text-sm 
    border 
    rounded 
    min-w-full 
    p-3 
    mt-2 
    outfocus:outline-0 
    focus:outline-gray-300
`;

export const TabButton = tw.button`
    inline-block 
    px-4 
    py-3
    text-gray-700
    rounded-t
    hover:text-gray-600 
    hover:bg-gray-100
`;

export const ModalContainer = tw.div`
    fixed 
    inset-0 
    flex 
    justify-center 
    backdrop-blur-xs 
    items-center 
    bg-black 
    bg-opacity-25 
    z-50
`;

export const TagLabel = tw.label`
    text-xs 
    inline-flex 
    items-center 
    font-bold 
    leading-sm 
    px-2
    sm:px-3 
    py-2 
    my-2 
    mx-2 
    text-black 
    rounded-full
    bg-color-gray-50 
    border-gray-300
    border 
    cursor-pointer 
    hover:bg-gray-300
    peer-checked:bg-point-blue 
    peer-checked:text-white`;

