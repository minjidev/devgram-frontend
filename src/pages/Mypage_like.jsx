import MypageItems from '@components/mypage/mypage_items'
import MypageProfile from '@components/mypage/mypage_profile'

export default function MypageLike() {
  return (
    <div className='flex justify-between w-10/12 m-auto'>
      <div className='w-3/12'> 
      <MypageProfile />
      </div>
      <div className='w-8/12 bg-white'>
        <MypageItems title="좋아요한 상품" count="9" button="더보기 >" />
      </div>
    </div>
  )
}