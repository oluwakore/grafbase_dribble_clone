"use client";

import { ReactNode, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  children: ReactNode;
};

const Modal = ({ children }: Props) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismissModal = useCallback(() => {
    router.push("/")
  }, [router]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if((e.target === overlay.current) && onDismissModal) {
      onDismissModal()
    }
  }, [onDismissModal, overlay]);

  

  return (
    <div ref={overlay} className="modal" onClick={handleOverlayClick}>
      <button
        type="button"
        onClick={onDismissModal}
        className="absolute top-4 right-8"
      >
        <Image src="/close.svg" alt="close" width={17} height={17} />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
};

export default Modal;
