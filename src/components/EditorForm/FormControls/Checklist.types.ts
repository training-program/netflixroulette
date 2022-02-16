import { GenresChecklist } from '@src/types/';

export type ChecklistProps = {
  values: GenresChecklist;
  name: string;
  placeholder: string;
  onChange: (value: GenresChecklist) => void;
};
