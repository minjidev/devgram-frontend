import { Router, Routes, Route, Link } from 'react-router-dom';
/* import Example from "@mypage/responsive"; */
import Mypage from "@mypage/Mypage";
import MypageLike from "@mypage/Mypage_like";
import MypageMyFeed from "@mypage/Mypage_MyFeed";
import MypageUserFeed from "@mypage/Mypage_UserFeed";
import MypageFollowing from "@mypage/Mypage_Following";
import MypageMyReview from "@mypage/Mypage_MyReview"
import MypageProfile from "@components/mypage/Mypage_profile"
import styles from './index.css'

function App() {
    return (
        <>
        <Routes>
            <Route path="*" element={<Mypage />}></Route>
            <Route path="/review" element={<MypageMyReview />}></Route>
            <Route path="/like" element={<MypageLike />}></Route>
            <Route path="/feed" element={<MypageMyFeed />}></Route>
            <Route path="/userFeed" element={<MypageUserFeed />}></Route>
            <Route path="/follow" element={<MypageFollowing />}></Route>
        </Routes>
    </>  
    );
}

export default App;
