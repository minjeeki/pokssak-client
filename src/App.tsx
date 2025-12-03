import { BrowserRouter, Route, Routes } from "react-router-dom";

import PageLayout from "./layouts/PageLayout";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="detail/:id" element={<PlaceDetailPage />} />
          <Route path="mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
