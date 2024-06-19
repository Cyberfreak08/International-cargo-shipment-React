import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getUserDataFromLocalStorage } from '../Redux/reducers/userSlice';

const useProtectedRoute = () => {
    const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserDataFromLocalStorage());
  }, [dispatch]);
  return isLoggedIn;
};

export default useProtectedRoute;
