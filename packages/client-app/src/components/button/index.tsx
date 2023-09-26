// React
import React from "react";
// Utils
import classNames from "classnames";
// Styles
import styles from "./index.module.scss";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const Button = ({
  children,
  type,
  ...otherProps
}: Readonly<ButtonProps>): React.ReactElement => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={classNames(styles.root, otherProps.className)}
    {...otherProps}
  >
    {children}
  </button>
);
