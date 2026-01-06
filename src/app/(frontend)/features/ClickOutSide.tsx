import { ReactNode, useEffect, useRef } from "react";

interface OutsideclickProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Outsideclick: React.FC<OutsideclickProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <>
      <div ref={modalRef} className=" relative">
        {children}
      </div>
    </>
  );
};

export default Outsideclick;
