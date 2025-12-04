import React from "react";

import { Drawer } from "vaul";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
  subtitle?: string;
}

export default function CommonBottomModal({ children, isOpen, setIsOpen, title, subtitle }: Props) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Portal>
        {/* Overlay */}
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />

        {/* Content */}
        <Drawer.Content className="fixed right-0 bottom-0 left-0 z-[9999] mx-auto mt-24 flex max-h-[80vh] flex-col rounded-t-[10px] bg-white md:max-w-[50vw]">
          {/* SwipeHandle */}
          <div className="mx-auto my-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />

          {/* ModalHeader */}
          <div className="mb-3 flex w-full flex-shrink-0 flex-col items-center gap-3 text-center break-keep whitespace-pre-wrap text-[#1c408c]">
            {/* img 태그가 들어올 경우를 대비해 width 스타일 적용이 필요하다면 여기에 추가 */}
            {/* 예: [&>img]:w-[60%] [&>img]:mb-3 */}

            <div className="title-area">
              <h2 className="m-0 text-2xl">{title}</h2>
              {subtitle && <span className="text-sm">{subtitle}</span>}
            </div>
          </div>

          {/* ScrollContent */}
          <div className="flex-1 overflow-y-auto [&_img]:w-full [&_img]:max-w-[400px]">
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

// 참고: CloseMenus는 JSX에 사용되지 않았지만 필요하다면 아래와 같이 작성합니다.
// <div className="box-border w-full p-4">...</div>
