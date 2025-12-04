import { useEffect, useRef, useState } from "react";

import type { KakaoMapType } from "@/global";
import { VStack } from "@vapor-ui/core";

import { useGeoLocation } from "@/hooks/useGeoLocation";
import { setMapType, zoomIn, zoomOut } from "@/utils/mapUtils";

// 1. Props 인터페이스 정의
interface KakaoMapProps {
  width?: string;
  height?: string;
}

// 2. Props 구조 분해 할당 및 기본값 설정
const KakaoMap = ({ width = "100%", height = "100%" }: KakaoMapProps) => {
  const { location, isLoading } = useGeoLocation();

  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<KakaoMapType | null>(null);
  const [selectedType, setSelectedType] = useState<"roadmap" | "skyview">("roadmap");

  useEffect(() => {
    if (!window.kakao) {
      return;
    }
    const container = mapContainer.current;
    if (!container) {
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(
        location?.latitude || 33.450701,
        location?.longitude || 126.570667
      ),
      level: 4,
    };

    const timer = setTimeout(() => {
      // 지도가 이미 생성되어 있다면 새로 생성하지 않음 (React StrictMode 등 고려)
      if (!map) {
        const kakaoMap = new window.kakao.maps.Map(container, options);
        setMap(kakaoMap);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [isLoading]); // 의존성 배열 유지

  // 창 크기가 변할 때 지도의 중심을 유지하거나 레이아웃을 다시 잡는 로직이 필요할 수 있음
  useEffect(() => {
    if (map) {
      map.relayout(); // 지도의 크기가 변경되었을 때 레이아웃 갱신
      if (location) {
        const moveLatLon = new window.kakao.maps.LatLng(location.latitude, location.longitude);
        map.setCenter(moveLatLon);
      }
    }
  }, [width, height, map, location]);

  const handleMapTypeChange = (type: "roadmap" | "skyview") => {
    if (map) {
      setMapType(map, type);
      setSelectedType(type);
    }
  };

  const baseBtnStyle =
    "flex-1 text-center leading-[30px] cursor-pointer text-xs font-sans transition-colors";
  const activeBtnStyle = "text-white bg-gradient-to-b from-[#425470] to-[#5b6d8a] hover:text-white";
  const inactiveBtnStyle =
    "bg-gradient-to-b from-white to-[#e6e6e6] hover:from-[#f5f5f5] hover:to-[#e3e3e3] active:from-[#e6e6e6] active:to-white text-black";

  return (
    <VStack className="h-full w-full">
      <div
        id="map"
        ref={mapContainer}
        style={{ width, height }}
        className="relative overflow-hidden rounded-[10px]"
      >
        {/*지도타입 선택*/}
        <div className="absolute top-2.5 right-2.5 z-[2] flex h-[30px] w-[130px] overflow-hidden rounded-[5px] border border-[#919191] shadow-sm">
          <span
            className={`${baseBtnStyle} ${selectedType === "roadmap" ? activeBtnStyle : inactiveBtnStyle}`}
            onClick={() => handleMapTypeChange("roadmap")}
          >
            지도
          </span>
          <span
            className={`${baseBtnStyle} ${selectedType === "skyview" ? activeBtnStyle : inactiveBtnStyle}`}
            onClick={() => handleMapTypeChange("skyview")}
          >
            스카이뷰
          </span>
        </div>

        {/*줌 선택*/}
        <div className="absolute top-[50px] right-2.5 z-[2] flex h-20 w-9 flex-col items-center overflow-hidden rounded-[5px] border border-[#919191] bg-[#f5f5f5]">
          <span
            className="flex h-10 w-full cursor-pointer items-center justify-center border-b border-[#bfbfbf] hover:bg-gray-100"
            onClick={() => map && zoomIn(map)}
          >
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
              alt="확대"
              className="h-[15px] w-[15px]"
            />
          </span>
          <span
            className="flex h-10 w-full cursor-pointer items-center justify-center hover:bg-gray-100"
            onClick={() => map && zoomOut(map)}
          >
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
              alt="축소"
              className="h-[15px] w-[15px]"
            />
          </span>
        </div>
      </div>
    </VStack>
  );
};

export default KakaoMap;
