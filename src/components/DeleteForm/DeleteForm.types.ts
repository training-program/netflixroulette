export type DeleteFormProps = {
  onSubmit: () => void;
  onClose: () => void;
  fetchApi: (id: number) => Promise<void>;
  id: number | null;
};
