import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"

import Navigation from '@components/MainPage/Header/Navigation'
import FeedWriteList from '@components/FeedPage/Write/FeedWriteList'
import FeedWriteQue from '@components/FeedPage/Write/FeedWriteQue'
import FeedWriteFile from '@components/FeedPage/Write/FeedWriteFile'
import FeedWriteModal from '@components/FeedPage/Write/FeedWriteModal'

/* 피드 작성페이지 뷰 */
export default function FeedWriteView() {
  const Btn = tw.button`
  text-center
  btn
  md:w-22 
  bg-white
  text-black
  border-gray-300
  border-2
  hover:text-white
  hover:bg-point-blue
  hover:border-point-blue
  `
  const [modalOpen, setModalOpen] = useState(false)

  /* 필수질문 관리 */
  const [target1, setTarget1] = useState(false)
  const [target2, setTarget2] = useState(false)

  function handlerModalBtn() {
    if (!target1 && !target2) {
      alert("필수질문을 모두 작성해주세요.")
    }
    else if (!target1) {
      alert("자기소개를 작성해주세요.")
    }
    else if (!target2) {
      alert("추천하는 이유를 작성해주세요.")
    }
    else {
      setModalOpen(!modalOpen)
    }
  }

  return (
    <dlv>
    {modalOpen ? <div className="fixed w-full h-full bg-black z-40 opacity-70"></div> : null}
    <Navigation />
    <div className='text-black mt-12'>
      <div className="m-auto w-[700px]">
      <iframe src="#" name="iframe" className='w-px h-px border-0 invisible'></iframe>
      <form action="http://localhost:3001/board" method="post" target="iframe">
        {/* 공지 */}
        <div className="notice">
          <FeedWriteList title="주의사항"/>
        </div>

        {/* 자기소개와 사진 */}
        <div className="intro">
          <FeedWriteFile title="자기소개" mandatory={true} guide="자기소개를 입력 해주세요 (블로그, SNS, 깃헙주소 등을 적으셔도 됩니다)" name="intro"
          explain="자기소개"
          target={setTarget1}
          />
        </div>

        {/* 장비 선택 */}
        <div className="equipment">
          {/* name: equipment */}
        </div>

        {/* 추천 사유 */}
        <div className="recommend">
            <FeedWriteQue title="추천하는 이유" mandatory={true} guide="추천한 장비에 대한 장점을 적어주세요, 가성비나 외형, 기능 등을 자유롭게 적어주시면 됩니다." name="recommend"
            explain="장비를 추천하는 이유"
            target={setTarget2}
            />
        </div>

        {/* 가장 베스트 아이템을 꼽자면 (이유와 함께) */}
        <div className="best">
          <FeedWriteQue title="베스트 장비" guide="추천한 장비중 하나를 골라, 타 장비와 차별화 된 장점을 적어주세요." name="best" explain="하나의 베스트 장비를 이유와 함께"/>
        </div>

        {/* 그 외에 추천할만한 보조 장비가 있는지 */}
        <div className="etc">
        <FeedWriteQue title="기타 추천 장비" guide="위에선 선택하지 않았지만 추천할만한 장비들을 적어주세요, 추천 장비와 어울리는 보조장비를 적어주셔도 좋습니다." name="etc" explain="추천할만한 보조장비들"/>
        </div>

        {/* 마지막으로 적고 싶은 내용 */}
        <div className="last">
          <FeedWriteQue title="마지막" guide="마지막으로 적으실 말을 자유롭게 작성해주세요." name="last" explain="마지막으로 자유롭게 내용"/>
        </div>

        {/* 제목 */}
        <div className="title mt-6">
          <label htmlFor="titleInput" className='absolute w-px h-px -m-px overflow-hidden'>
            제목입력하는 창
          </label>
          <input type="text" className='text-4xl bg-white outline-none border-b-2 border-gray-300 w-full' placeholder='제목을 입력하세요'
          name="title"
          id="titleInput"
          />
        </div>
        <div className="btn-box flex flex-row-reverse mt-10">
          <Btn onClick={handlerModalBtn} type="button">작성</Btn>
          {modalOpen === true ? <FeedWriteModal setModalOpen={setModalOpen}/> : null}
        </div>
        </form>
      </div>
    </div>
    </dlv>
  )  
}