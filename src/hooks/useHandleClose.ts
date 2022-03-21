import { useNavigate } from 'react-router-dom';

const useHandleClose = () => {
  const navigate = useNavigate();
  return () => navigate(-1);
};

export default useHandleClose;
