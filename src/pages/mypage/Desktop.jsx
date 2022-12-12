export default function MypageDesktop() {
  return (
    <div className='flex justify-between w-10/12 m-auto mt-12 text-black'>
      <div className='w-3/12'>
        <MypageProfile img={bird}/>
      </div>
      <div className='w-8/12'>
        <div className='reviews'>
          <MypageTitle title="나의 리뷰" btn={<Link to="/review">더보기</Link>}/>
          <ul className='flex justify-between flex-wrap gap-[1em] mt-3'>
          {reviews.map(review => (
            <MainReview
            name={review.name}
            title={review.title}  
            star={review.star}
            review={review.review}
            ></MainReview>
          ))}
          </ul>
        </div>
        
        <div className='likes mt-12'>
          <MypageTitle title="좋아요한 상품" btn={<Link to="/like">더보기</Link>}/>
          <ul className='flex justify-between flex-wrap gap-[1em] mt-6'>
          {likes.map(like => (
            <MypageGoods title={like.title}
            ></MypageGoods>
          ))}
          </ul>
        </div>
        
        <div className='feeds mt-12'>
          <MypageTitle title="나의 피드" btn={<Link to="/feed">더보기</Link>}/>
          <ul className='flex justify-between flex-wrap gap-[1em]'>
            {feeds.map(f => (
              <MypageFeed
              user={f.user}
              feed={f.feed}
              ></MypageFeed>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
