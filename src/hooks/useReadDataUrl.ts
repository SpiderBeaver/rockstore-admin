import { useEffect, useState } from 'react';

export function useReadDataUrl(file: File | null) {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    if (file !== null) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        if (data) {
          setDataUrl(data as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setDataUrl('');
    }
  }, [file]);

  return dataUrl;
}
