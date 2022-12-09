export default function MypageTitle({title, btn = null}) {

  const button = <button className="btn btn-outline w-22 btn-sm text-black hover:border-point-blue hover:bg-point-blue hover:text-white">{btn}</button>

  return (
    <>
    <div className='flex justify-between mb-3 h-8'>
      <p className="text-base font-bold leading-8">{title}</p>
      {btn == null ? null : button}
      </div> 
      <hr></hr>
    </>
  )
}