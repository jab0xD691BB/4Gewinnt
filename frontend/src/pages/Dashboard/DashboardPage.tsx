import styled from "styled-components";
import { footerHeight, headerHeight, Layout } from "../../components/Layout";
import React from "react";

const DashboardBody = styled.div`
  border: 1px solid white;
  height: 100%;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  width: 100%;
`;

export const DashboardPage = () => {
  return (
    <Layout>
      <DashboardBody>test</DashboardBody>
    </Layout>
  );
};
