import MQQTDisplay from "@/components/MQQTDisplay";
import styles from "./page.module.css";

export default function Home() {

  return (
    <div className={styles.page}>
      <MQQTDisplay />
    </div>
  );
}
