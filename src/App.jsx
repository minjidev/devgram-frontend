import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mypage from "./pages/Mypage";
import MypageLike from "./pages/Mypage_like";
import MypageMyFeed from "./pages/Mypage_MyFeed";
import MypageUserFeed from "./pages/Mypage_Userfeed";
import MypageFollowing from "./pages/Mypage_Following";
import MypageMyReview from "./pages/Mypage_MyReview"

function App() {
    return (
        <>
{/*             <MypageLike />
            <MypageUserFeed /> */}
            <Mypage />
{/*             <MypageMyReview />
            <MypageFollowing />
            <MypageMyFeed /> */}
        </>  
        /* 밑코드 - 나중에 메인페이지로 연결할 것 */
    // <BrowserRouter>
    //     <Routes>
    //         <Route path="/" element={<Mypage />}></Route>
    //         {/* 에러사이트 처리
    //         <Route path="*" element={<NotFound />}></Route> */}
    //     </Routes>
    // </BrowserRouter>
    );
}

export default App;
