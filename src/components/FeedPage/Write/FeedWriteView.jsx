import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"

import Navigation from '@components/MainPage/Header/Navigation'
import FeedWriteList from '@components/FeedPage/Write/FeedWriteList'
import FeedWriteQue from '@components/FeedPage/Write/FeedWriteQue'
import FeedWriteFile from '@components/FeedPage/Write/FeedWriteFile'
import FeedWriteEquipment from '@components/FeedPage/Write/FeedWriteEquipment'

import FeedWriteModal from '@components/FeedPage/Write/FeedWriteModal'
import EquipmentModal from '@components/FeedPage/Write/Modal/EquipmentModal'

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

  const [atest, setatest] = useState([])

  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch(`http://52.194.161.226:8080/api/boards`);
      const result = res.json();
      return result;
    }	
    fetchData().then(res => setatest(res));
  }, [])
  
  console.log(atest, "f")

  const [modalOpen, setModalOpen] = useState(false)
  const [EquiModal, setEquiModal] = useState(false)
  const [products, setproducts] = useState([])
  /* 폼데이터로 보낼 이미지 파일 */
  const [fileImg, setfileImg] = useState()

  /* 필수질문 관리 */
  const [target1, setTarget1] = useState(false)
  const [target2, setTarget2] = useState(false)
  const [tmpEquiArr, settmpEquiArr] = useState([])

  const [tagList, settagList] = useState([])

  function handlerModalBtn() {
    /* if (!target1 && !target2) {
      alert("필수질문을 모두 작성해주세요.")
    }
    else {
      setModalOpen(!modalOpen)
    } */
    setModalOpen(!modalOpen)
  }

  /* 태그 보내는 함수 */
  function handlerTagBtn() {
    const tag = document.getElementById('tagInput');

    if(!tag) {
      return null
    } else {
      let tmp = tagList
      tmp.push(tag.value)
      settagList(tmp)
      tag.value = null
    }
  }

  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch(`http://localhost:3001/product`);
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setproducts(res));
    }, []);
    console.log(fileImg)
  return (
    <dlv>
    {modalOpen || EquiModal ? <div className="fixed w-full h-full bg-black z-40 opacity-70"></div> : null}
    <Navigation />
    <div className='text-black mt-12'>
      <div className="m-auto w-[700px]">
      <iframe src="#" name="iframe" className='w-px h-px border-0 invisible'></iframe>
      <form method="post" target="iframe" id='form'>
        {/* 공지 */}
        <div className="notice">
          <FeedWriteList title="주의사항"/>
        </div>

        {/* 자기소개와 사진 */}
        <div className="intro">
          <FeedWriteFile 
          title="자기소개" mandatory={true} 
          guide="자기소개를 입력 해주세요 (블로그, SNS, 깃헙주소 등을 적으셔도 됩니다)" name="selfIntroduce"
          explain="자기소개"
          target={setTarget1}
          setfileImg={setfileImg}
          />
        </div>

        {/* 장비 선택 */}
        <div className="equipment">
          <FeedWriteEquipment 
          title="장비선택" 
          mandatory={true} guide="추천하는 장비 선택해주세요" name="productSeqList"
          explain="자기소개"
          target={setTarget1}
          Btn={Btn}
          setEquiModal={setEquiModal}
          />
        </div>

        <input type="hidden" value={tmpEquiArr} name="productSep" />

        {/* 추천 사유 */}
        <div className="recommend">
            <FeedWriteQue title="추천하는 이유" mandatory={true} guide="추천한 장비에 대한 장점을 적어주세요, 가성비나 외형, 기능 등을 자유롭게 적어주시면 됩니다." name="recommendReason"
            explain="장비를 추천하는 이유"
            target={setTarget2}
            />
        </div>

        {/* 가장 베스트 아이템을 꼽자면 (이유와 함께) */}
        <div className="best">
          <FeedWriteQue title="베스트 장비" guide="추천한 장비중 하나를 골라, 타 장비와 차별화 된 장점을 적어주세요." name="bestProduct" explain="하나의 베스트 장비를 이유와 함께"/>
        </div>

        {/* 그 외에 추천할만한 보조 장비가 있는지 */}
        <div className="etc">
        <FeedWriteQue title="기타 추천 장비" guide="위에선 선택하지 않았지만 추천할만한 장비들을 적어주세요, 추천 장비와 어울리는 보조장비를 적어주셔도 좋습니다." name="otherProduct" explain="추천할만한 보조장비들"/>
        </div>

        {/* 마지막으로 적고 싶은 내용 */}
        <div className="last">
          <FeedWriteQue title="마지막" guide="마지막으로 적으실 말을 자유롭게 작성해주세요." name="content" explain="마지막으로 자유롭게 내용"/>
        </div>
        
        <div className="last">

          {/* 태그 */}
          <div className="tag-box mt-6">
            <h2>태그 추가</h2>
            <ul className='flex mb-1'>
              {tagList.map(tag => (
                <li className='border-2 p-1 cursor-pointer hover:bg-gray-200 mr-2 rounded-md'>{tag}</li>
              ))}
            </ul>
            <input type="text" className='border-2 focus:outline-0 bg-white' id="tagInput"/>
            <button className='btn btn-sm ml-3' onClick={() => handlerTagBtn()} type="button">추가</button>
            {tagList.length === 0 ? null :  <button className='btn btn-sm ml-3' onClick={() => settagList([])}>전체 삭제</button>}
          </div>
        </div>
        <input type="hidden" name='tagNames' value={tagList} />

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
          {modalOpen === true ? <FeedWriteModal setModalOpen={setModalOpen}
          file={fileImg}
          /> 
          : null}
          {EquiModal === true ? <EquipmentModal Open={setEquiModal}
          products={products}
          list={settmpEquiArr}
          /> 
          : null}
        </div>
        </form>
      </div>
    </div>
    </dlv>
  )  
}