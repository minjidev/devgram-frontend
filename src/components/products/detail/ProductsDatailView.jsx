import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import Navigation from "@components/mainpage/header/Navigation"
import ProductsDetailIntro from "@components/products/detail/ProductsDetailIntro"
import ProductsDetailPhoto from "@components/products/detail/ProductsDetailPhoto"
import PhotoModal from "@components/products/detail/modal/PhotoModal"
import ProductsDetailReview from "@components/products/detail/ProductsDetailReview"

export default function ProductsDatailView() {
  const params = useParams();
  const [reviewNum, setReviewNum] = useState(Number(params.id));
  const [products, setProducts] = useState([])
  const [reviews, setreviews] = useState([])

  const [photoModalOpen, setphotoModalOpen] = useState(false)

  function handlerPhotoLi(num) {
    setReviewNum(num)
    setphotoModalOpen(true)

  }

  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch(`http://localhost:3001/product`);
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setProducts(res));
    }, []);
    console.log(reviewNum)
  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch(`http://localhost:3001/review`);
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setreviews(res));
    }, []);

  let matchedItem = products.find(element => 
      element.id === Number(params.id)
    );
    console.log(reviews[reviewNum])

  return (
    <>
    {photoModalOpen ? <div className="fixed w-full h-full bg-black z-40 opacity-70"></div> : null}

    {/* nav */}
    <Navigation />

    <div className="m-auto text-black w-4/5 bg-white mt-6">

      {/* 상품 소개 (버그 수정하고 주석 해제) */}
      {products.length > 0 ? <ProductsDetailIntro 
      id={matchedItem.id}
      title={matchedItem.title}
      category_Seq={matchedItem.category_Seq}
      rating={matchedItem.rating}
      like_Count={matchedItem.like_Count}
      price={matchedItem.price}
      /> : null}

      {/* 포토 칸 (리뷰 사진 리스트) */}
      <div className="photo-container md:block hidden">
            <p>포토 55건</p>
            {reviews.length > 0 ? <ul className='flex gap-[1%]'>
                {reviews.slice(0, 9).map(review => (
                  <li className='basis-[10.3%] h-32 bg-keyboard-img rounded shadow-md cursor-pointer' id={review.id} onClick={(e) => handlerPhotoLi(e.target.id)}>
                  </li>
                ))}
              </ul> : null}
          </div>
      {/* 모달창: 이미지 누르면 맞춰서 나옴 */}
      {reviews.length > 0 && photoModalOpen ? <PhotoModal 
        Open={setphotoModalOpen}
        review={reviews[reviewNum].review}
        starLength={reviews[reviewNum].star}
        userid={reviews[reviewNum].userid}
        day={reviews[reviewNum].day}
        length={reviews.length}
        num={reviewNum}
        count={setReviewNum}
        /> : null} 

      {/* 리뷰 칸 */}
      <ProductsDetailReview />

    </div>
    </>
  )
}