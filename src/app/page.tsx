import React from "react";
import Image from "next/image";
import { getBoards } from "../utils/pinterest";
import Button from "../components/Button";
import styles from "./styles.module.css";

export default async function Page() {
  const boards = await getBoards();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Boards</h1>
      <ul className={styles.boardList}>
        {boards.items.map((board: any) => (
          <li key={board.id} className={styles.boardItem}>
            <Image
              src={board.media.image_cover_url}
              alt={board.name}
              width={100}
              height={100}
              className={styles.boardImage}
            />
            <p className={styles.boardName}>{board.name}</p>
            <Button board={board} />
          </li>
        ))}
      </ul>
    </div>
  );
}
