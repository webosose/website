import React from "react";
import { useLiveUpdate } from "../../../hooks/useLiveDate";
import styles from "./ClockWidget.module.css";

export const Clock: React.FC = () => {
    const now = useLiveUpdate();
    const hour = (now.getHours() % 12 || 12).toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");
    const ampm = now.getHours() < 12 ? "AM" : "PM";

    return (
        <div className={styles.Clock}>
            <div className={styles.time}>
                {hour}:{minute}
            </div>
            <div className={styles.ampm}>{ampm}</div>
        </div>
    );
};
