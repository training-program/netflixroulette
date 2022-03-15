import { FormVariant, BaseMovie, Movie } from '@src/types';

export type EditorFormProps = {
  movie: BaseMovie;
  onClose: () => void;
  onSubmit: (movie: Movie) => void;
  variant: FormVariant;
};
