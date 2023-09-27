import styles from "./index.module.scss";
/// React
import React, { useEffect } from "react";
// Components
import { GlobalNotifications } from "@components/global-notifications";
// Store
import { Store } from "@store/index";
import { generatePath, useNavigate, useParams } from "react-router";
import { getRoute } from "@router/utils/get-route";

interface LayoutProps {
  pageRestrict: "authenticated" | "not-authenticated" | "none";
  children: React.ReactNode | React.ReactNode[];
}

export const Layout = ({
  children,
  pageRestrict,
}: Readonly<LayoutProps>): React.ReactElement => {
  const params = useParams();
  const navigate = useNavigate();
  const { authToken } = Store.auth.useData();

  useEffect(() => {
    if (pageRestrict === "authenticated" && !authToken) {
      navigate(generatePath(getRoute("login"), params), {
        replace: true,
      });
    }

    if (pageRestrict === "not-authenticated" && authToken) {
      navigate(generatePath(getRoute("home"), params), {
        replace: true,
      });
    }
  }, [pageRestrict, authToken, navigate, params]);

  return (
    <main className={styles.root}>
      <GlobalNotifications />
      {children}
    </main>
  );
};
