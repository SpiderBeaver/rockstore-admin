import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

export interface SearchFieldProps {
  onChange: (query: string) => void;
  delay?: number;
}
export default function SearchField({ onChange, delay = 500 }: SearchFieldProps) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(searchQuery);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery, delay, onChange]);

  return <TextField label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></TextField>;
}
