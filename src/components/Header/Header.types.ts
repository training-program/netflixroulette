import { Dispatch, SetStateAction } from 'react';

export type HeaderProps = {
  onOpenAdd: () => void;
  onSubmit: Dispatch<SetStateAction<string>>;
  query: string;
};
