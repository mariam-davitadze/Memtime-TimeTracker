import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const ClientsLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Outlet />
    </Layout>
  );
};

export default ClientsLayout;
