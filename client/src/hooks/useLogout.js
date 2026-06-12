import { use, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { makeRequest } from "../axios";
import { AuthContext } from "../context/authContext";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearUser } = use(AuthContext);

  const mutation = useMutation({
    mutationFn: () => makeRequest.post("/auth/logout"),
    onSuccess: () => {
      clearUser();
      queryClient.clear();
      toast.success("Logged out");
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Unable to log out");
    },
  });

  const logout = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return {
    logout,
    isLoggingOut: mutation.isPending,
  };
};
