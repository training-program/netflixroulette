import { SyntheticEvent } from 'react';
import { FormVariant, GenreRecord, MovieDraft } from '@src/types';

export type FieldNames = keyof MovieDraft;

export type EditorFormProps = {
  id?: number;
  onClose: () => void;
  variant: FormVariant;
};

type FieldValue<T> = T extends 'genres' ? GenreRecord : string;

export type FormStateField<T> = {
  value: FieldValue<T>;
  error: string;
  touched: boolean;
};

export type FormData = {
  [key in FieldNames]: FormStateField<key>;
};

export interface FormState extends FormData {
  errorCount: number;
  isFetching: boolean;
  hasError: boolean;
}

export type TextEvents = SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>;

export enum ActionType {
  Reset = 'Reset',
  TouchAll = 'TouchAll',
  Input = 'Input',
}

type Payload<T> = { name: T; value: FieldValue<T> };

type ResetAction = { type: ActionType.Reset };
type TouchAllAction = { type: ActionType.TouchAll };
type UpdateAction<T> = { type: ActionType.Input; payload: Payload<T> };

export type Action<T> = ResetAction | TouchAllAction | UpdateAction<T>;
