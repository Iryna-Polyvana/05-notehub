import { useEffect } from 'react';
import type { ReactNode } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
}
const modalRoot = document.getElementById('modal-root')!;


export default function Modal({ onClose, children }: ModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
            onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    return createPortal(
        <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={onClose}>
            <div
                className={css.modal}
                onClick={(e) => e.stopPropagation()}
            >
                {children}   
            </div>
        </div>,
    modalRoot
    )
}