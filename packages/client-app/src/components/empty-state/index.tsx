// React
import React from "react";
// Styles
import styles from "./index.module.scss";

export interface EmptyStateProps {
  children: React.ReactNode;
}

export const EmptyState = ({
  children,
}: Readonly<EmptyStateProps>): React.ReactElement => (
  <div className={styles.root}>{children}</div>
);
