export default function mypageTitle({title, btn = null}) {
  return (
    <div className='flex justify-between mb-3'>
      <p>{title}</p>
      {btn}
      </div> 
  )
}