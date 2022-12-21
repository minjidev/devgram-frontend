import { useState, useEffect } from 'react'

export default function ProductsDetailPhoto() {
  const [reviews, setreviews] = useState([])

  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch(`http://localhost:3001/product?_limit=10`);
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setreviews(res));
    }, []);

  return (
    <div className="photo-container md:block hidden">
      <p>포토 55건</p>
        <ul className='flex'>
          {reviews.map(review => (
            <li className='w-full h-32 bg-gray-500 border-2'>{review.title}</li>
          ))}
        </ul>
    </div>
  )
}