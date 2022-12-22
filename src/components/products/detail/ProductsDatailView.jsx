import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import Navigation from "@components/mainpage/header/Navigation"
import ProductsDetailIntro from "@components/products/detail/ProductsDetailIntro"
import ProductsDetailPhoto from "@components/products/detail/ProductsDetailPhoto"
import ProductsDetailReview from "@components/products/detail/ProductsDetailReview"

export default function ProductsDatailView() {
  const params = useParams();
/*   const [products, setProducts] = useState([])

  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch(`http://localhost:3001/product`);
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setProducts(res));
    }, []);
    console.log(products)

  let matchedItem = products.find(element => 
      element.id === Number(params.id)
    );
    
  console.log(matchedItem) */

  return (
    <>
    {/* nav */}
    <Navigation />

    <div className="m-auto text-black w-4/5 bg-white mt-6">

      {/* 상품 소개 (버그 수정하고 주석 해제) */}
{/*       <ProductsDetailIntro 
      id={matchedItem.id}
      title={matchedItem.title}
      category_Seq={matchedItem.category_Seq}
      rating={matchedItem.rating}
      like_Count={matchedItem.like_Count}
      price={matchedItem.price}
      /> */}

      {/* 포토 칸 (리뷰 사진 리스트) */}
      <ProductsDetailPhoto review={products} />

      {/* 리뷰 칸 */}
      <ProductsDetailReview />
    </div>
    </>
  )
}