import Title from "@components/mypage/mypage_title"

export default function MypageItems({title, count, button = null}) {
  const itemStyle = 'basis-[30%] grow bg-red-800 min-h-[150px] rounded-[5px] flex-1'
  const item = <li className={itemStyle}>아이템</li>
  const items = []

  for (let i = 0; i < count; i++) {
    items.push(item)
  }

  const itemList = items.map((v) => (v))

  return (
    <div className="h-72">
      <Title title={title} btn={button}/>
      <ul className='flex justify-between flex-wrap gap-[1em]'>
      {itemList}
      </ul>
    </div>
  )
}