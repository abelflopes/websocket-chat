import styles from "./Default.module.scss";
/// React
import React, { useEffect } from "react";
// Components
import { type LayoutProps } from "@layouts/types";
import { GlobalNotifications } from "@components/global-notifications";
// Store
import { Store } from "@store/index";
import { generatePath, useNavigate, useParams } from "react-router";
import { getRoute } from "@router/utils/get-route";

interface DefaultLayoutProps extends LayoutProps {
  pageRestrict: "authenticated" | "not-authenticated" | "none";
}

export const DefaultLayout = ({
  children,
  pageRestrict,
}: Readonly<DefaultLayoutProps>): React.ReactElement => {
  const params = useParams();
  const navigate = useNavigate();
  const authToken = Store.auth.useAuthToken();

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
