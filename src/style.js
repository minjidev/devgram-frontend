import tw from "tailwind-styled-components";

export const TagLabel = tw.label`
text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-2 my-2 mx-2 text-black rounded-full
bg-color-gray-50 border-gray-300 border cursor-pointer hover:bg-gray-300
 peer-checked:bg-point-blue peer-checked:text-white`;
