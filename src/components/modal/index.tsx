'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { useKey } from '@/hooks/use-key';
import { ModalSystem, type ModalContent, type ModalData } from './system';

interface ModalProps {
  modal: ModalData;
  removeModal: (modal: ModalData) => void;
  children: ModalContent;
}

const MODAL_DURATION = 200;

const Modal = ({ modal, removeModal, children }: ModalProps) => {
  const [visible, setIsVisible] = useState(false);

  const deleteModalTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setIsVisible(true);

    document.body.style.overflowY = 'hidden';
    document.body.style.marginRight = '17px';

    return () => {
      clearTimeout(deleteModalTimeoutRef.current);
      document.body.style.overflowY = '';
      document.body.style.marginRight = '';
    };
  }, []);

  const deleteModal = () => {
    if (!visible) return;

    setIsVisible(false);

    // visible = false;
    deleteModalTimeoutRef.current = setTimeout(() => {
      removeModal(modal);
    }, MODAL_DURATION);
  };

  if (modal.close && visible) {
    deleteModal();
  }

  return (
    <>
      <div
        className={`duration-[${
          MODAL_DURATION + 100
        }ms] absolute h-screen w-full bg-black transition-opacity ${
          visible ? 'opacity-70' : 'pointer-events-none opacity-0'
        } `}
        onClick={deleteModal}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal
        className={cn(
          'absolute flex size-full min-w-60 flex-1 text-foreground center',

          `transition duration-[${MODAL_DURATION}ms] `,

          visible
            ? 'scale-100 transform-none opacity-100 ease-out'
            : 'ease pointer-events-none translate-y-4 scale-[.9] opacity-0'
        )}
      >
        {children(deleteModal)}
      </div>
    </>
  );
};

export const ModalRenderer = () => {
  const [modals, setModals] = useState<ModalData[]>([]);

  const removeModal = useCallback((modal: ModalData) => {
    setModals(modals => modals.filter(m => m.id !== modal.id));

    ModalSystem.close(modal.id);
  }, []);

  useEffect(
    () =>
      ModalSystem.subscribe(data => {
        if (data.close) {
          setModals(modals => modals.map(m => (m.id === data.id ? { ...m, close: true } : m)));

          return;
        }

        setModals(modals => {
          const modalExistsIndex = modals.findIndex(m => m.id === data.id);

          if (modalExistsIndex !== -1) {
            return [
              ...modals.slice(0, modalExistsIndex),
              { ...modals[modalExistsIndex], ...data },
              ...modals.slice(modalExistsIndex + 1)
            ];
          }

          return [...modals, data];
        });
      }),
    []
  );

  useKey('Escape', () => {
    if (modals.length) {
      ModalSystem.close(modals[0].id);
    }
  });

  if (!modals.length) return null;

  return (
    <section aria-label="Notifications alt+T" tabIndex={-1}>
      <div tabIndex={-1} className="absolute h-screen w-full">
        <div className="fixed z-10 flex h-full w-full items-center justify-center overflow-hidden">
          {modals.map(modal => (
            <Modal key={modal.id} modal={modal} removeModal={removeModal}>
              {modal.content as ModalContent}
            </Modal>
          ))}
        </div>
      </div>
    </section>
  );
};
