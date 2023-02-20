import { useSearchParams } from 'react-router-dom';

const useQueryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };
};

export default useQueryString;
