import styles from "./index.module.scss";
/// React
import React, { useRef, useEffect } from "react";
// Utils
import classNames from "classnames";

const color = `hsl(${Math.floor(Math.random() * 360)}deg 55% 40%)`;

interface MessageProps {
  senderName: string;
  text: string;
  type: "sent" | "received";
  joinTop: boolean;
  joinBottom: boolean;
}

export const Message = ({
  senderName,
  text,
  type,
  joinTop,
  joinBottom,
}: Readonly<MessageProps>): React.ReactElement => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <div
      ref={ref}
      className={classNames(styles.root, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [styles[type]!]: type,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [styles["join-top"]!]: joinTop,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [styles["join-bottom"]!]: joinBottom,
      })}
      style={{
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        ["--primary-color" as keyof React.CSSProperties]: color,
      }}
    >
      <div ref={ref} className={styles.sender}>
        {senderName}
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};
