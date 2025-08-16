import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useCallback,
} from "react";

// hooks
import { useToggleLockScroll } from "@/hooks/useToggleLockScroll";
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  maxWidth?: string;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, isOpen, setIsOpen, maxWidth = "max-w-xl" }, ref) => {
    useHandleOutsideClick(ref as React.RefObject<HTMLDivElement>, setIsOpen);

    // Handle ESC key to close modal
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      },
      [setIsOpen]
    );

    useToggleLockScroll(isOpen);

    useEffect(() => {
      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
      } else {
        document.removeEventListener("keydown", handleKeyDown);
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, handleKeyDown]);

    return (
      <div
        className={`${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } z-30 fixed inset-0 transition-opacity backdrop-blur-sm bg-modal flex items-center justify-center px-4`}
      >
        <div
          ref={ref}
          className={`${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } relative transition-transform bg-light dark:bg-dark border-2 ${maxWidth} w-full mx-auto rounded shadow-xl p-4 sm:p-6`}
        >
          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
