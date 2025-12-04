import { useState } from "react";

import CommonBottomModal from "@/components/CommonBottomModal";
import KakaoMap from "@/components/KakaoMap";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div style={{ flex: "1" }}>
      <KakaoMap width={"100vw"} height={"100vh"} />
      <CommonBottomModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title={"바텀시트 테스트"}
        children={<>바텀시트 테스트입니다</>}
      />
    </div>
  );
};

export default HomePage;
