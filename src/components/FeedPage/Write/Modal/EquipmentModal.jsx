import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Search from '@components/mainpage/header/Search'

export default function EquipmentModal({products, list, Open}) {
  const [tmpArr, setTmpArr] = useState([])
  
  function aa(event) {
    event.stopPropagation()
    const li = event.currentTarget
    const item = event.currentTarget.id
    let Arr = [...tmpArr]
    li.classList.toggle("border-2")
    
    if (tmpArr.includes(item)) {
      Arr = Arr.filter((element) => element !== item)
    } else {
      Arr.push(item)
    }
    setTmpArr(Arr)
  }

  function submitbtn() {
    list(tmpArr)
    Open(false)
  }

  console.log(tmpArr, "t")

  return (
    <div className="fixed z-50 w-2/5 h-[70%] border-gray-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md overflow-hidden">
      <div className="title-box top flex text-gray-100 justify-between ">
      <h1 className='text-3xl mb-3'>추천 장비 선택창 </h1>
        <XMarkIcon className='w-10 cursor-pointer' onClick={() => Open(false)} />
      </div>
      <div className="bg-white h-full overflow-y-scroll rounded-md">
        {tmpArr.length > 0 
        ? <div className="search-box flex ml-3">
          <button type="button" className='btn' onClick={submitbtn}>완료</button>
          </div> 
        : null
        }
        <ul className='flex justify-between flex-wrap gap-[0.5em] mt-6 ml-3 mr-3'>
            {products.map(product => (
              <li className='w-[18%] h-28 rounded-2xl overflow-hidden cursor-pointer shadow-md border-gray-500 transition-all duration-[25ms]'
              id={product.id}
              onClick={(e) => 
                aa(e)
              }
              >
                <div className="img bg-white h-4/5 bg-keyboard-img bg-cover">
                </div>
                <div className="text bg-black h-[100%] text-gray-100 text-xs text-center text-ellipsis overflow-hidden whitespace-nowrap pl-1 pr-1">
                  {product.title}
                </div>
              </li>
          ))}
        </ul>
      </div>
    </div>
  )
}