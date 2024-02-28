/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const items: MenuProps["items"] = [
  {
    label: "Micro Frontends Project1",
    key: "react",
  },
  {
    label: "Micro Frontends Project2",
    key: "vue",
  },
];

function push(subApp: string) {
  history.pushState(null, subApp, subApp);
}

const AppMenu: React.FC = () => {
  const [current, setCurrent] = useState("react");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);

    if (e.key === "react") {
      push("/app-react");
    }
    if (e.key === "vue") {
      push("/app-vue");
    }
  };

  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <div id="container"></div>
    </div>
  );
};

export default AppMenu;
