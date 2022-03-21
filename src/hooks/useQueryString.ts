import { createSearchParams, URLSearchParamsInit, useNavigate } from 'react-router-dom';

const useQueryString = () => {
  const navigate = useNavigate();

  return (searchParams: URLSearchParamsInit) => {
    navigate(`?${createSearchParams(searchParams)}`);
  };
};

export default useQueryString;
