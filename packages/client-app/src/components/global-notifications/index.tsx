import styles from "./index.module.scss";
// React
import React, { useEffect } from "react";
// Components
import { Alert } from "@components/alert";
// Store
import { Store } from "@store/index";

export const GlobalNotifications = (): React.ReactElement => {
  const notifications = Store.notifications.useData();
  const removeNotification = Store.notifications.useRemove();

  useEffect(() => {
    if (!notifications) return;

    notifications.forEach((notification) => {
      const timeout = setTimeout(() => {
        removeNotification(notification.id);
      }, 8000);

      return () => {
        clearTimeout(timeout);
      };
    });
  }, [notifications, removeNotification]);

  return (
    <div className={styles.root}>
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          type={notification.type}
          title={notification.title}
          onClose={(): void => {
            removeNotification(notification.id);
          }}
        >
          {notification.description}
        </Alert>
      ))}
    </div>
  );
};
