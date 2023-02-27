import { AppDispatch } from '@src/store';
import { FormVariant, BaseMovie } from '@src/types';

export type EditorFormProps = {
  action: (movie: BaseMovie) => (dispatch: AppDispatch) => Promise<void>;
  variant: FormVariant;
};
