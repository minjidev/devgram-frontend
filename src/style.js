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
    table-auto
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
    min-w-[100px]
    w-full 
    p-3 
    mt-2 
    outfocus:outline-0 
    focus:outline-gray-300
`;
