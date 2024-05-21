import { tokenState } from "@/state/authState";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getStorageItem, saveStorage } from "@/services/storageService";
import {
  STORAGE_TOKEN_KEY,
  STORAGE_REFRESH_TOKEN_KEY,
} from "@/constants/storageKey";

const useAuth = () => {
  const [accessToken, setAccessToken] = useRecoilState(tokenState);

  const checkStorageToken = useCallback(() => {
    const tokenStorage = getStorageItem(STORAGE_TOKEN_KEY);
    if (tokenStorage) {
      setAccessToken(tokenStorage);
      return tokenStorage;
    }
  }, [setAccessToken]);

  const saveAccessToken = useCallback(
    (token: string) => {
      setAccessToken(token);
      saveStorage(STORAGE_TOKEN_KEY, token);
    },
    [setAccessToken]
  );

  const saveRefreshToken = useCallback((token: string) => {
    saveStorage(STORAGE_REFRESH_TOKEN_KEY, token);
  }, []);

  return {
    accessToken,
    checkStorageToken,
    saveAccessToken,
    saveRefreshToken,
  };
};

export default useAuth;
