import { FormVariant, Movie } from '@src/types';

type PropsFromRedux = {
  movies: Movie[];
};

type OwnProps = {
  onSubmit: (movie: Movie) => void;
  variant: FormVariant;
};

export type EditorFormProps = PropsFromRedux & OwnProps;
