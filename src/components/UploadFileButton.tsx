import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components/macro';

const UploadButton = styled.label`
  display: block;
`;

const HiddenInput = styled.input`
  visibility: hidden;
`;

interface UploadFileButtonProps {
  onFileSelect?: (file: File) => void;
}
export default function UploadFileButton({ onFileSelect }: UploadFileButtonProps) {
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file !== undefined) {
      onFileSelect?.(file);
    }
  };

  return (
    <UploadButton>
      <Button variant="contained" color="default" component="span">
        Upload
      </Button>
      <HiddenInput type="file" name="picture" onChange={handleInputChange}></HiddenInput>
    </UploadButton>
  );
}
