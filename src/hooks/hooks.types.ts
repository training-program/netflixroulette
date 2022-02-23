import { SyntheticEvent, RefObject } from 'react';

export type OnClose = (event: Event | SyntheticEvent) => unknown;
export type ReactDevRef = RefObject<HTMLDivElement>;
