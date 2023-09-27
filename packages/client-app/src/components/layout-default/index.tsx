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
  const { authToken, valid } = Store.auth.useData();
  const validateAuthToken = Store.auth.useValidate();
  const refreshAuthToken = Store.auth.useRefresh();

  useEffect(() => {
    if (pageRestrict === "authenticated" && (!authToken || !valid)) {
      navigate(generatePath(getRoute("login"), params), {
        replace: true,
      });
    }

    if (pageRestrict === "not-authenticated" && authToken) {
      navigate(generatePath(getRoute("home"), params), {
        replace: true,
      });
    }
  }, [pageRestrict, authToken, navigate, params, valid]);

  useEffect(() => {
    if (authToken) void validateAuthToken(authToken);
  }, [authToken, validateAuthToken]);

  useEffect(() => {
    if (!valid && authToken) void refreshAuthToken(authToken);
  }, [authToken, refreshAuthToken, valid, validateAuthToken]);

  return (
    <main className={styles.root}>
      <GlobalNotifications />
      {children}
    </main>
  );
};
