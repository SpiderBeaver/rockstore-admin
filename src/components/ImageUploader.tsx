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
}
export default function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const pictureDataUrl = useReadDataUrl(file);

  const handleFileSelect = (file: File) => {
    setFile(file);
    onImageSelect?.(file);
  };

  return (
    <div>
      <PictureContainer>
        <Picture src={pictureDataUrl}></Picture>
      </PictureContainer>

      <UploadFileButton onFileSelect={handleFileSelect}></UploadFileButton>
    </div>
  );
}
