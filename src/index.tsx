import "./public-path";
import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import AppRouter from "./views/route";

function render(props: { container?: HTMLDivElement }) {
  const { container } = props;

  const rootContainer = container
    ? container.querySelector("#root")
    : document.querySelector("#root");

  const root = createRoot(rootContainer!); // createRoot(container!) if you use TypeScript
  root.render(<App />);
}

const App: React.FC = () => (
  <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
    <AppRouter />
  </ConfigProvider>
);

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log("[react18] react app bootstraped");
}

export async function mount(props: any) {
  console.log("[react18] props from main framework", props);
  render(props);
}

export async function unmount(props: any) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}
