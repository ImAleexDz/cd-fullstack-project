import Image from "next/image";
import styles from "./page.module.css";
import FirstComponentExample from "@/app/components/FirstComponentExample"

export default function Home() {

  return (
    <div>
      <FirstComponentExample />
      <h1>Hello world</h1>
    </div>
  );
}
