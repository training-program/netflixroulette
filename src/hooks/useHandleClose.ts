import { PATHS } from '@src/types';
import { useNavigate } from 'react-router-dom';

const useHandleClose = () => {
  const navigate = useNavigate();
  return () => navigate(PATHS.SEARCH);
};

export default useHandleClose;
