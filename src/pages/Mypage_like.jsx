import { useState, useEffect } from 'react'
import MypageGoods from '@components/mypage/Mypage_goods'
import MypageProfile from '@components/mypage/mypage_profile'
import MypageTitle from '@components/mypage/Mypage_title'

export default function MypageLike() {
  const [like, setLike] = useState([])

  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch('https://fc0dd02c-41c7-4117-a17c-53569011aee5.mock.pstmn.io/product');
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setLike(res));
    }, []);

  return (
    <div className='flex justify-between w-10/12 m-auto'>
      <div className='w-3/12'> 
      <MypageProfile />
      </div>
      <div className='w-8/12 bg-white'>
        <MypageTitle title="좋아요한 상품"/>
        <ul className='flex justify-between flex-wrap gap-[1em]'>
        {like.map(product => (
          <MypageGoods title={product.title}
          ></MypageGoods>
        ))}
        </ul>
      </div>
    </div>
  )
}