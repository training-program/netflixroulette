import { Movie, BaseMovie, RequestParams } from '@src/types';
import { SyntheticEvent, RefObject } from 'react';

export type OnClose = (event: Event | SyntheticEvent) => unknown;
export type ReactDevRef = RefObject<HTMLDivElement>;
export type ApiResponse<T> = T extends BaseMovie ? Movie : T extends RequestParams ? Movie[] : void;
