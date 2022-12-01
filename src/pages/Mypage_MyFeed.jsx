import { useRef, useState, useEffect } from 'react'
import MypageFeed from '@components/mypage/Mypage_Feed'
import Load from '../image/Load.png'

export default function MypageMyFeed() {
  const [feed, setFeed] = useState([])
  const [target, setTarget] = useState(null);

  // 데이터 페칭 함수
  // const page = 1;
  const fetchData = async () => {
    const response = await fetch(`https://a861831a-3d4e-42e0-9c51-7ca470881e0a.mock.pstmn.io/boards`);
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

  console.log(feed)
  // 삭제할 것들(아래)
  /* useEffect(() => {
		const fetchData = async() => {
          const res = await fetch('https://a861831a-3d4e-42e0-9c51-7ca470881e0a.mock.pstmn.io/boards');
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setFeed(res));
    }, []); */
    // 삭제(위)
  return (
    <div className='w-10/12 m-auto'>
      <div className='bg-white'>
        <ul className='flex justify-between flex-wrap gap-[1em]'>
          {feed.map(f => (
            <MypageFeed
            feed={f.feed}
            ></MypageFeed>
          ))}
        </ul>
      </div>
      <img src={Load} ref={setTarget}/>
    </div>
  )
}