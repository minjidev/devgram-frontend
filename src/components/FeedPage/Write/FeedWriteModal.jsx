import tw from "tailwind-styled-components"
import axios from 'axios';

import { CheckCircleIcon } from '@heroicons/react/24/solid'

export default function FeedWriteModal({setModalOpen, file}) {
  const Btn = tw.button`
  text-center
  btn
  btn-sm
  md:w-22 
  bg-white
  border-gray-200
  border-2
  text-black
  hover:text-white
  hover:bg-point-blue
  hover:border-point-blue
  `

  function submitBtn() {
    let formData = new FormData()
    const obj = {};
    const form = document.getElementById('form');

    formData.append('file', file)
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const payload = new FormData(form);
      
      payload.forEach((value, key) => obj[key] = value);
      console.log(obj, "aa")
      /* formData.append('board', new Blob([JSON.stringify(obj)], {type: 'application/json'})) */
      formData.append("data", JSON.stringify(obj))
    })
    axios.post('http://localhost:3001/board', formData)
    axios({
      method: "POST",
      url: `http://52.194.161.226:8080/api/boards`,
      mode: "cors",
      headers: {
        "Content-Type": "multipart/form-data", 
      },
      data: formData,
    });
    /* location.reload() */
  }

  return (
    <div id="container" className="fixed z-50 w-96 h-72 bg-white border-gray-200 border-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md">
      <CheckCircleIcon className="w-24 m-auto text-point-blue"/>
      <h2 className="text-xl text-center font-medium mt-1.5">피드 작성을 완료했습니다.</h2>

      <ul className="list-disc list-inside text-sm
        text-gray-500 pt-3.5 ml-3 mr-3">
        <li className="mb-0.5">부적절한 내용이 포함되어 있을 시 이용자 차단과 함께 글이 삭제될 수 있으니 유의 해주시기 바랍니다.</li>
        <li><span className="text-point-blue ">수락</span>을 누를 시 피드 업로드가 완료됩니다.</li>
      </ul>

      <div className="btn-box ml-3 mr-3 mt-6 flex flex-row-reverse">
        <Btn className="ml-1.5" onClick={() => setModalOpen(false)} type="button">취소</Btn>
        <Btn onClick={() => submitBtn()}>수락</Btn>
      </div>
    </div>
  )  
}