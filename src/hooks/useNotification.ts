import { notification } from "antd";
import React from "react";

type NotiType = "success" | "info" | "warning" | "error";

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: NotiType, message?: string) => {
    api[type]({
      message: message,
      duration: 1,
    });
  };

  return {
    openNotification,
    contextHolder,
  };
};

export default useNotification;
