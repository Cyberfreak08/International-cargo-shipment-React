import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDataFromLocalStorage } from "../Redux/reducers/userSlice";

const useAdminHook = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (user !== null) {
      dispatch(getUserDataFromLocalStorage());
    }
  }, [dispatch]);
  return user;
};

export default useAdminHook;
