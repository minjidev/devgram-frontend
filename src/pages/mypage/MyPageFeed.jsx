import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import tw from "tailwind-styled-components"
import MypageSubFeed from '@components/mypage/MyPageSubFeed'
import Load from '@image/Load.png'
import MypageTitle from '@components/mypage/MyPageTitle';

export default function MypageMyFeed() {
  const [feed, setFeed] = useState([])
  const [target, setTarget] = useState(null);
  const [targetOn, setTargetOn] = useState(false);
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
  //http://52.194.161.226:8080/api/boards?page=${page}
  // let page = 0;
/*   const fetchData = async () => {
    const response = await fetch(`http://52.194.161.226:8080/api/boards?page=${page}`);
    const data = await response.json();
    const data2 = await data.content
    console.log(data2, "D")
    if (data2.length === 0) {
      setTargetOn(true)
    } else {
      setFeed((prev) => prev.concat(data2));
      /* page++; */
/*     }
  };  */
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3001/product`);
    const data = await response.json();
      setFeed((prev) => prev.concat(data2));
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
          } else {
            liFeeds[i].classList.add('border')
            liFeeds[i].classList.add('border-sky-500')
            deleteArr.push(liFeeds[i].id)
          }
        })
      }
    }, [feed, btnClick])

    /* 피드 delete 요청 */
    function handlerDeleteBtn() {
    for (let i = 0; i < deleteArr.length; i++) {
      document.getElementById(deleteArr[i]).remove()
      fetch(`http://localhost:3001/board/${deleteArr[i]}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
    }
      handlerBtn()
    }

    /* link로 값 보내기 */
    const location = useLocation();

  return (
    <div className='w-10/12 m-auto pb-6'>
      <div className='flex justify-between'>
        <MypageTitle title={location.state.name} />
        <div className='btnBox'>
          {btn}
        </div>
      </div>
      <hr></hr>

      <div className='bg-white'>
        <ul className='flex justify-between flex-wrap gap-[1em] mt-6'>
          {feed.map(feed => (
            <MypageSubFeed
            id={feed.id}
            img={feed.createdByImg}
            ></MypageSubFeed>
          ))}
        </ul>
      </div>
      <img src={Load} ref={setTarget} className={`${targetOn ? "hidden" : null}`}/>
    </div>
  )
}