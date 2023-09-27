import styles from "./index.module.scss";
/// React
import React from "react";

interface LayoutProps {
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
}

export const Layout = ({
  title,
  description,
  children,
}: Readonly<LayoutProps>): React.ReactElement => (
  <main className={styles.root}>
    <h2>{title}</h2>
    <p>{description}</p>

    {children}
  </main>
);
