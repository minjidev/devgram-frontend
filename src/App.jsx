import { Router, Routes, Route, Link } from 'react-router-dom';
/* import Example from "@mypage/responsive"; */
import Mypage from "@mypage/Mypage";
import MypageLike from "@mypage/Like";
import MypageMyFeed from "@mypage/MyFeed";
import MypageUserFeed from "@mypage/UserFeed";
import MypageFollowing from "@mypage/Following";
import MypageMyReview from "@mypage/MyReview"
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
