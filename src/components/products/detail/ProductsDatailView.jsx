import { useState, useEffect } from 'react'

import Navigation from "@components/mainpage/header/Navigation"
import ProductsDetailIntro from "@components/products/detail/ProductsDetailIntro"
import ProductsDetailPhoto from "@components/products/detail/ProductsDetailPhoto"
import ProductsDetailReview from "@components/products/detail/ProductsDetailReview"

export default function ProductsDatailView() {
  const [token, settoken] = useState([])
  
  useEffect(() => {
  const fetchData = async() => {
    const res = await fetch(`http://52.194.161.226:8080/api/user`);
    const result = res.json();
    return result;
  }	
  headers : {
    Authorization : localStorage.getItem("access_token")
  }
  fetchData().then(res => settoken(res));
  }, []);

  useEffect(() => {
  fetch("http://52.194.161.226:8080/api/user",{
        method : "POST",
        headers : {
            Authorization : localStorage.getItem("access_token")
        }
 })
.then(response => response.json())
.then(response => {
   console.log(response.data);
})
}, []);

  console.log(token)

  return (
    <div className="m-auto text-black w-4/5 bg-white">
      {/* nav */}
      <Navigation />

      {/* 상품 소개 */}
      <ProductsDetailIntro />

      {/* 포토 칸 (리뷰 사진 리스트) */}
      <ProductsDetailPhoto />

      {/* 리뷰 칸 */}
      <ProductsDetailReview />
    </div>
  )
}