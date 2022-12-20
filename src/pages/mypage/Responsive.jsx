import { useMediaQuery } from 'react-responsive'

/* 최소 1024 작업 ㅣ 디자인 1500 */
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 })
  return isDesktop ? children : null
}
/* 최소 768기준 작업 */
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 })
  return isTablet ? children : null
}
/* 최소 375기준 작업 */
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}

const Example = () => (
  <div>
    <Desktop>Desktop or laptop</Desktop>
    <Tablet>Tablet</Tablet>
    <Mobile>Mobile</Mobile>
  </div>
)

export { Desktop, Tablet, Mobile } 
// export default Example 