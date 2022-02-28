import { MouseEvent, Dispatch, SetStateAction } from 'react';

export type MovieCardProps = {
  id: number;
  title: string;
  tagline: string;
  release_date: string;
  poster_path: string;
  onContextMenu: (event: MouseEvent<HTMLDivElement>) => void;
  setCurrentId: Dispatch<SetStateAction<number | null>>;
};
