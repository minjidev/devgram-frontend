import MypageProfile from '@components/mypage/mypage_profile'
import MypageItems from '@components/mypage/mypage_items'
import styles from '../index.css'

export default function Mypage() {
  return (
    <div className='flex justify-between w-10/12 m-auto'>
      <div className='w-3/12'>
      <MypageProfile />
      </div>
      <div className='w-8/12 bg-white'>
      <MypageItems title="나의 리뷰" count="3" button="더보기 >" />
      <MypageItems title="좋아요한 상품" count="3" button="더보기 >" />
      <MypageItems title="나의 피드" count="3" button="더보기 >" />
      </div>
    </div>
  )
}



