import styles from "./index.module.scss";
/// React
import React from "react";

interface MessageProps {
  text: string;
}

export const Message = ({
  text,
}: Readonly<MessageProps>): React.ReactElement => (
  <div className={styles.root}>{text}</div>
);
