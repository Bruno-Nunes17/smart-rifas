import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loader = () => (
  <Spin className="d-flex justify-content-center mt-5"
    indicator={
      <LoadingOutlined
        style={{
          fontSize: 44,
        }}
        spin
      />
    }
  />
);
export default Loader;
