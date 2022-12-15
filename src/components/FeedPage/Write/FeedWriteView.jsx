import { useState } from 'react'

import FeedWriteList from '@components/FeedPage/Write/FeedWriteList'
import FeedWriteQue from '@components/FeedPage/Write/FeedWriteQue'
import FeedWriteFile from '@components/FeedPage/Write/FeedWriteFile'

/* 피드 작성페이지 뷰 */
export default function FeedWriteView() {
  return (
    <div className='bg-white h-[3000px] text-black'>
      <div className="m-auto w-[700px] bg-red-200">

      <form action="http://localhost:3001/board" method="post">
        {/* 공지 */}
        <div className="notice">
          <FeedWriteList title="주의사항 칸"/>
        </div>

        {/* 자기소개와 사진 */}
        <div className="intro">
          <FeedWriteFile title="자기소개 칸" mandatory={true} guide="자기소개를 입력해주세요 (블로그, SNS, 깃헙주소 등을 적으셔도 됩니다)" name="intro"
          explain="자기소개"/>
        </div>

        {/* 장비 선택 */}
        <div className="equipment">
          {/* name: equipment */}
        </div>

        {/* 추천 사유 */}
        <div className="recommend">
            <FeedWriteQue title="추천사유 칸" mandatory={true} guide="이 장비를 사용하는 특별한 이유들을 적어주세요!" name="recommend"
            explain="장비를 추천하는 이유"/>
        </div>

        {/* 가장 베스트 아이템을 꼽자면 (이유와 함께) */}
        <div className="best">
          <FeedWriteQue title="베스트 장비 칸" guide="타 장비와 차별화 된 특별한 점 (ex 가격, 성능) 을 적어주세요!" name="best" explain="베스트 장비 하나 골라서"/>
        </div>

        {/* 그 외에 추천할만한 보조 장비가 있는지 */}
        <div className="etc">
        <FeedWriteQue title="번외 칸" guide="추천해주신 장비와 같이 사용하면 좋을 보조 장비 등을 적어주시고, 사유도 곁들여주시면 좋아요." name="etc" explain="추천할만한 보조장비들"/>
        </div>

        {/* 마지막으로 적고 싶은 내용 */}
        <div className="last">
        <FeedWriteQue title="마지막 칸" guide="마지막으로 적으실 말을 자유롭게 작성해주세요." name="last" explain="마지막으로 적을 내용"/>
        </div>

        {/* 제목 */}
        <div className="title">
          <label htmlFor="titleInput" className='absolute w-px h-px -m-px overflow-hidden'>
            제목입력하는 창
          </label>
          <input type="text" className='text-4xl bg-white outline-none border-b-2 border-gray-300' placeholder='제목을 입력하세요'
          name="title"
          id="titleInput"
          />
        </div>

        <button type="submit" formMethod="POST" className='btn'>전송</button>
        </form>
      </div>
    </div>
  )  
}