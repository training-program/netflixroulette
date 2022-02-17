import { GenreRecord } from '@src/types/';

export type ChecklistProps = {
  values: GenreRecord;
  name: string;
  placeholder: string;
  onChange: (value: GenreRecord) => void;
};
