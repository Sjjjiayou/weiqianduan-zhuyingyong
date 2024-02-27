import { Spin } from "antd";
import React, { Suspense, lazy } from "react";
import { Routes, HashRouter, Route, Link } from "react-router-dom";
import { Divider } from "antd";
import LibVersion from "./components/LibVersion";
import HelloModal from "./components/HelloModal";
import Home from "./pages/Home";
import "./App.css";

const About = lazy(() => import("./pages/About"));

const RouteExample = () => {
  return (
    <HashRouter
      basename={(window as any).__POWERED_BY_QIANKUN__ ? "/app-react" : "/"}
    >
      <nav>
        <Link to="/">Home</Link>
        <Divider type="vertical" />
        <Link to="/about">About</Link>
      </nav>
      <Suspense fallback={<Spin spinning={true} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default function AppRouter() {
  return (
    <div className="app-main">
      <LibVersion />
      <HelloModal />
      <Divider />
      <RouteExample />
    </div>
  );
}
