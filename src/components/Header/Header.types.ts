import { RequestParameters } from '@src/types';
import { Dispatch, SetStateAction } from 'react';

export type HeaderProps = {
  query: string;
  onChange: Dispatch<SetStateAction<RequestParameters>>;
};
