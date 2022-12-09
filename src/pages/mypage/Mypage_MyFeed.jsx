import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import tw from "tailwind-styled-components"
import MypageSubFeed from '@components/mypage/Mypage_SubFeed'
import Load from '@image/Load.png'
import MypageTitle from '@components/mypage/Mypage_title';

export default function MypageMyFeed() {
  const [feed, setFeed] = useState([])
  const [target, setTarget] = useState(null);
  const [btnClick, setBtnClick] = useState(false)
  const [btn, setBtn] = useState()

  const Btn = tw.button`
  text-center
  btn
  rounded-3xl
  w-22 
  hover:text-white
  btn-sm
  hover:bg-point-blue
  hover:border-point-blue
  `

  let deleteArr = []

  const button1 = <Btn onClick={handlerBtn}>선택하기</Btn>
  const button2 = [
  <Btn onClick={handlerDeleteBtn} className="mr-3">삭제</Btn>,
  <Btn onClick={handlerBtn}>취소</Btn>
  ]
  
  // 데이터 페칭 함수
  // const page = 1;
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3001/board`);
    const data = await response.json();
    setFeed((prev) => prev.concat(data));
    // page++;
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 옵져버 생성
  useEffect(() => {
    let observer;
    if (target) {
      const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          await fetchData();
          observer.observe(entry.target);
        }
      };
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

    /* 버튼 세팅 */
    useEffect(() => {
      setBtn(button1)
    }, [])


    function handlerBtn() {
      setBtnClick((btnClick) => !btnClick);
      console.log(btnClick)
    }

    useEffect(() => {
      if (!btnClick) {
        setBtn(button1)
      } else {
        setBtn(button2)
      }
    }, [btnClick])
    

    /* 이벤트리스너 피드페이지 */
    useEffect(() => {
      const liFeeds = document.getElementsByClassName('liFeed')
      for (let i = 0; i < liFeeds.length; i++) {
        /* 버튼 off 클릭 방지 */
        if (!btnClick) {
          return
        }
/*         console.log(btnClick, "tt") */
        liFeeds[i].addEventListener('click', function() {
          /* 삭제할 피드 toggle */
          if (deleteArr.includes(liFeeds[i].id)) {
            deleteArr = deleteArr.filter((element) => element !== liFeeds[i].id)
            liFeeds[i].classList.remove('border')
            liFeeds[i].classList.remove('border-sky-500')
            console.log(deleteArr, "deleteArr2")
          } else {
            liFeeds[i].classList.add('border')
            liFeeds[i].classList.add('border-sky-500')
            deleteArr.push(liFeeds[i].id)
            console.log(deleteArr, "deleteArr")
          }
          console.log(liFeeds[i], "liFeeds[i]")
        })
      }
    }, [feed, btnClick])

    /* 피드 delete 요청 */
    function handlerDeleteBtn() {
      console.log("12")
    for (let i = 0; i < deleteArr.length; i++) {
      fetch(`http://localhost:3000/board/${deleteArr[i]}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => console.log(json))

      document.getElementById(deleteArr[i]).remove();
    }
      handlerBtn()
    }

    /* link로 값 보내기 */
    const location = useLocation();
    console.log()

  return (
    <div className='w-10/12 m-auto'>
      <div className='flex justify-between'>
        <MypageTitle title={location.state.name} />
        <div className='btnBox'>
          {btn}
        </div>
      </div>
      <hr></hr>
      <div className='bg-white'>
        <ul className='flex justify-between flex-wrap gap-[1em] mt-6'>
          {feed.map(f => (
            <MypageSubFeed
            /* key={f.id}  */
            id={f.id}
            feed={f.feed}
            on={btnClick}
            ></MypageSubFeed>
          ))}
        </ul>
      </div>
      <img src={Load} ref={setTarget}/>
    </div>
  )
}