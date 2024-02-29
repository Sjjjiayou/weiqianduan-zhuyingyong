import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import AppHome from "./views/app-menu";
import { registerMicroApps, start } from "qiankun";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  console.log("77777777");
  useEffect(() => {
    registerMicroApps([
      {
        name: "app-react",
        entry: "/app-react",
        container: "#container",
        activeRule: "/app-react",
      },
      {
        name: "app-vue",
        entry: "//localhost:7102",
        container: "#container",
        activeRule: "/app-vue",
      },
    ]);
    // 启动 qiankun
    start();
  });

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
      <AppHome />
    </ConfigProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
