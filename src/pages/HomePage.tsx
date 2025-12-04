import { useState } from "react";

import { VStack } from "@vapor-ui/core";

import CommonBottomModal from "@/components/CommonBottomModal";
import KakaoMap from "@/components/KakaoMap";

import "./KakaoMap.css";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <VStack>
      <KakaoMap />
      <CommonBottomModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title={"바텀시트 테스트"}
        children={<>바텀시트 테스트입니다</>}
      />
    </VStack>
  );
};

export default HomePage;
