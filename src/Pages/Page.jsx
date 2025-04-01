import { setChatId } from "@/redux/chatSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Page({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const chatId = sessionStorage.getItem("chat");
    dispatch(setChatId({ chatId }));
  }, []);
  return <div className="">{children}</div>;
}
