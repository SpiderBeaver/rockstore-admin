import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useReadDataUrl } from '../hooks/useReadDataUrl';
import UploadFileButton from './UploadFileButton';

const PictureContainer = styled.div`
  width: 400px;
  height: 400px;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  margin-bottom: 20px;
`;

const Picture = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export interface ImageUploaderProps {
  onImageSelect?: (file: File) => void;
  initialImageFilename?: string;
}
export default function ImageUploader({ onImageSelect, initialImageFilename }: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const pictureDataUrl = useReadDataUrl(file);

  const handleFileDrop: React.DragEventHandler = (event) => {
    event.preventDefault();
    if (event.dataTransfer.items) {
      if (event.dataTransfer.items.length > 0) {
        const item = event.dataTransfer.items[0];
        if (item.kind === 'file') {
          const file = item.getAsFile()!;
          setFile(file);
          onImageSelect?.(file);
        }
      }
    }
  };

  const handleFileDragOver: React.DragEventHandler = (event) => {
    // Prevent default behavior (Prevent file from being opened).
    // Yes, we need it on DragOver as well as on Drop.
    event.preventDefault();
  };

  const handleFileSelect = (file: File) => {
    setFile(file);
    onImageSelect?.(file);
  };

  return (
    <div>
      <PictureContainer onDrop={handleFileDrop} onDragOver={handleFileDragOver}>
        {pictureDataUrl !== null ? (
          <Picture src={pictureDataUrl}></Picture>
        ) : initialImageFilename !== undefined ? (
          <Picture src={`http://localhost:3001/uploads/${initialImageFilename}`}></Picture>
        ) : null}
      </PictureContainer>

      <UploadFileButton onFileSelect={handleFileSelect}></UploadFileButton>
    </div>
  );
}
