import { Inter } from "next/font/google";
import useAxios from "@/hooks/useAxios";
import { END_POINT } from "@/constants/endpoint";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import useNotification from "@/hooks/useNotification";
import NoneAvatar from "@/assets/avatar.png";
import Image from "next/image";
import { Button, Form, Input, Upload } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { accessToken } = useAuth();
  const { contextHolder, openNotification } = useNotification();
  const { getData, mutateData } = useAxios();
  const [user, setUser] = useState<UserType | null>(null);

  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [isEditName, setIsEditName] = useState(false);

  const getUserData = async () => {
    try {
      const data = await getData(END_POINT.USER.PROFILE);
      if (data?.success) {
        setUser(data?.data?.item);
      }
    } catch (error: any) {
      openNotification("error", error?.message);
    }
  };

  useEffect(() => {
    if (accessToken) getUserData();
  }, [accessToken]);

  const handleCancelEdit = () => {
    setIsEditAvatar(false);
    setIsEditName(false);
  };

  const onFinishEditAvatar = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("avatar", values?.avatar?.file?.originFileObj);
      const data = await mutateData(
        END_POINT.USER.PROFILE,
        formData,
        "put",
        true
      );
      setUser(data?.data?.item);
      setIsEditAvatar(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishEditName = (values: any) => {
    console.log(values.fullName);
  };

  return (
    <div className="p-12" onClick={handleCancelEdit}>
      <h2 className="mb-5">Xin chào {user?.username}</h2>

      <Form onFinish={onFinishEditAvatar}>
        <div className="flex items-center mb-3">
          {isEditAvatar ? (
            <Form.Item name={"avatar"}>
              <Upload multiple={false}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          ) : (
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden bg-slate-300">
              {user?.avatar ? (
                <img
                  src={user?.avatar}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={NoneAvatar}
                  alt="ba"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}
          <div>
            <Button
              type="link"
              htmlType={isEditAvatar ? "submit" : "button"}
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditAvatar(true);
              }}
            >
              {isEditAvatar ? "Lưu" : "Chỉnh sửa"}
            </Button>
          </div>
        </div>
      </Form>
      <div className="flex gap-2 items-center">
        <span className="text-lg">Tên: </span>
        <div className="font-semibold text-2xl">
          <Form
            onFinish={onFinishEditName}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              {isEditName ? (
                <Form.Item name="fullName">
                  <Input defaultValue={user?.fullName} />
                </Form.Item>
              ) : (
                <div className="text-2xl font-semibold">
                  {user?.fullName || "Bạn chưa có tên"}
                </div>
              )}
              <Button
                type="link"
                htmlType={isEditName ? "submit" : "button"}
                icon={<EditOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditName(true);
                }}
              >
                {isEditName ? "Lưu" : "Chỉnh sửa"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
