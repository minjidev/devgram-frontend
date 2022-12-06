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

export const Input = tw.input`
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

export const Table = tw.table`
    table 
    table-auto
    w-full 
    max-w-lg 
    my-3 
    text-base 
    font-normal
`;
