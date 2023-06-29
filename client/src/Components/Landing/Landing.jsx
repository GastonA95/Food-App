import React from "react";
import { Link } from "react-router-dom";
import video1 from "../../Images/video.mp4";

import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>App Food</h1>
        </div>
        <div className={styles.containerButton}>
          <Link to="/home">
            <button className={styles.button}>
              <span className={styles.box}>Ingresar</span>
            </button>
          </Link>
        </div>

        <div className={styles.headerOverlay}></div>

        <div className={styles.containerVideo}>
          <video muted autoPlay loop className={styles.videos}>
            <source src={video1} type="video/mp4" />
          </video>
        </div>
        <div className={styles.capa}></div>
      </header>
    </div>
  );
}
