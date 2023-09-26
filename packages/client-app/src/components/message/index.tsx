import styles from "./index.module.scss";
/// React
import React, { useRef, useEffect } from "react";
// Utils
import classNames from "classnames";

interface MessageProps {
  text: string;
  type: "sent" | "received";
  joinTop: boolean;
  joinBottom: boolean;
}

export const Message = ({
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
    >
      {text}
    </div>
  );
};
