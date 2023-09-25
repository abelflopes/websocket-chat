// React
import React from "react";
// Icons
import { FaX } from "react-icons/fa6";
// Components
import { Button } from "@components/button";
// Styles
import styles from "./index.module.scss";
// Utils
import classNames from "classnames";

export interface AlertProps {
  title: string | undefined;
  children?: React.ReactNode;
  onClose?: () => void;
  type: "error" | "success" | "warning" | "info";
}

export const Alert = ({
  title,
  onClose,
  children,
  type,
}: Readonly<AlertProps>): React.ReactElement => (
  <div className={classNames(styles.root, styles[type])} role="alert">
    <div>
      {title && <b className={styles.title}>{title}</b>}
      {children}
    </div>
    {onClose && (
      <Button onClick={onClose}>
        <FaX />
      </Button>
    )}
  </div>
);
