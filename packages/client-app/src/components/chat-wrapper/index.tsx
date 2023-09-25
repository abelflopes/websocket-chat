import styles from "./index.module.scss";
/// React
import React from "react";

interface ChatWrapperProps {
  footer: React.ReactElement;
  children: React.ReactElement | React.ReactElement[];
}

export const ChatWrapper = ({
  footer,
  children,
}: Readonly<ChatWrapperProps>): React.ReactElement => (
  <div className={styles.root}>
    <div className={styles.content}>{children}</div>
    <div className={styles.footer}>{footer}</div>
  </div>
);
