/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { useRef } from 'react';

interface UploadAreaProps {
  onUpload: (file: File) => void;
}

export const UploadArea = ({ onUpload, children }: React.PropsWithChildren<UploadAreaProps>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openExplorer = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  };

  return (
    <div onClick={openExplorer} className="flex-1 gap-6 center vertical">
      {children}

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.gif"
        onChange={event => {
          const { target } = event;
          const files = target?.files;

          if (!target || !files?.length) return;

          onUpload(files[0]);

          target.value = '';
        }}
        hidden
      />
    </div>
  );
};
