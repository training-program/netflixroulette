import { SyntheticEvent, RefObject } from 'react';

export type OnClose = (event: Event | SyntheticEvent) => unknown;
export type ReactDevRef = RefObject<HTMLDivElement>;

export enum FetchActionType {
  Loading = 'Loading',
  Fetched = 'Fetched',
  FetchError = 'FetchError',
}

type Loading = { type: FetchActionType.Loading };
type Fetched = { type: FetchActionType.Fetched };
type FetchError = { type: FetchActionType.FetchError };

export type FetchAction = Loading | Fetched | FetchError;

export type FetchState = {
  loading: boolean;
  error: boolean;
};
