import { useContext } from "react";
import { AuthContext } from "../Context/Auth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa";
import useAxiosPublic from "./useAxiosPublic";

const useAuth = () => {
  const {
    registerUser,
    user,
    signIn,
    logOut,
    loading: firebaseLoading,
    googleSignIn,
    updateUserProfile,
  } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const {
    data: role = null,
    isPending: roleLoading,
    isError: roleError,
    error: roleErrorMessage,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return null;
      }
      try {
        const res = await axiosPublic.get(`/users/role/${user.email}`);
        return res.data.role;
      } catch (err) {
        console.error("Error fetching user role:", err);

        if (err.response && err.response.status === 404) {
          return "user";
        }
        throw err;
      }
    },

    enabled: !firebaseLoading && !!user && !!user?.email,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,

    retry: 1,
  });

  const loading = firebaseLoading;

  return {
    registerUser,
    user,
    signIn,
    logOut,
    loading,
    googleSignIn,
    updateUserProfile,
    role,
    roleLoading,
    roleError,
    roleErrorMessage,
  };
};

export default useAuth;
