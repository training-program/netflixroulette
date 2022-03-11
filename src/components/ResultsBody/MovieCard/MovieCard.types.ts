import { MouseEvent } from 'react';

export type MovieCardProps = {
  id: number;
  title: string;
  tagline?: string;
  release_date: string;
  poster_path: string | null;
  onContextMenu: (event: MouseEvent<HTMLDivElement>) => void;
};
