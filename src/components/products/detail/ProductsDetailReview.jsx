import { StarIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/solid'
import tw from "tailwind-styled-components"
import { useEffect, useState } from 'react'

import Review from '@components/products/detail/Review'
import Pagination from '@components/products/ui/Pagination'

export default function ProductsDetailReview() {
  const [reviews, setreviews] = useState([])
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const Btn = tw.button`
  text-center
  btn
  rounded-3xl
  md:w-22 
  text-white
  hover:bg-point-blue
  hover:border-point-blue
  `
  

  useEffect(() => {
		const fetchData = async() => {
        const res = await fetch(`http://localhost:3001/review`);
        const result = res.json();
        return result;
      }	
        
      fetchData().then(res => setreviews(res));
    }, []);

  const stars = [
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>
  ] 

  return (
    <>
    <hr className='mt-3 mb-3 border-black'/>
    <div className="product-container">

      <div className="btn-container flex justify-between">
      {/* 페이지네이션 선택 */}
        <label>
          페이지 당 표시할 게시물 수:&nbsp;
          <select
            type="number"
            className='btn btn-sm rounded-3xl
            md:w-22 
            text-white
            hover:bg-point-blue
            hover:border-point-blue
            '
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>

      <div className="review-box mt-6">
        {reviews.slice(offset, offset + limit).map(review => (
        <Review
        userid={review.userid}
        title={review.title}
        name={review.name}
        star={review.star}
        day={review.day}
        review={review.review}
        >
          아
        </Review>
        ))}
      </div>

      <div className="pages text-center">
      <Pagination
          total={reviews.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
    </>
  )
}