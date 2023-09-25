// React
import React from "react";
// Styles
import styles from "./index.module.scss";
// Utils
import classNames from "classnames";

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const TextField = ({
  className,
  ...props
}: Readonly<TextFieldProps>): React.ReactElement => (
  <input {...props} className={classNames(className, styles.root)} />
);
