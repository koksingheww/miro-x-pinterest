"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

export default function Page({ params }: { params: { boardId: string } }) {
  const [pins, setPins] = useState<any[]>([]);
  const [selectedPins, setSelectedPins] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getPins = async () => {
      const response = await fetch(`/api/pinterest?boardId=${params.boardId}`);
      const data = await response.json();
      setPins(data.items);
    };

    getPins();
  }, [params.boardId]);

  const handleCheckboxChange = (pinId: string) => {
    setSelectedPins((prevSelectedPins) =>
      prevSelectedPins.includes(pinId)
        ? prevSelectedPins.filter((id) => id !== pinId)
        : [...prevSelectedPins, pinId]
    );
  };

  const handleSelectAllChange = () => {
    if (allSelected) {
      setSelectedPins([]);
    } else {
      setSelectedPins(pins.map((pin: any) => pin.id));
    }
    setAllSelected(!allSelected);
  };

  const addSelectedPinsToMiroBoard = async () => {
    setIsLoading(true);
    const spacing = 900;
    for (let i = 0; i < selectedPins.length; i++) {
      const pinId = selectedPins[i];
      const pin = pins.find((p: any) => p.id === pinId);
      if (pin) {
        const x = (i % 5) * spacing;
        const y = Math.floor(i / 5) * spacing;
        await createImage(pin.media.images["400x300"].url, x, y);
      }
    }
    setIsLoading(false);
    closeModal();
  };

  const createImage = async (url: string, x: number, y: number) =>
    await miro.board.createImage({
      title: "This is an image",
      url: url,
      x: x,
      y: y,
      width: 800,
      rotation: 0.0,
    });

  const closeModal = async () => {
    await window.miro.board.ui.closeModal();
  };

  return (
    <div>
      <h1>Pins</h1>
      <div className={styles.selectAll}>
        <label>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAllChange}
          />
          Select All
        </label>
      </div>
      <div className={styles.gridContainer}>
        {pins.map((pin: any) => (
          <div key={pin.id} className={styles.gridItem}>
            <p>
              {pin.title}
              <input
                type="checkbox"
                checked={selectedPins.includes(pin.id)}
                tabIndex={0}
                onChange={() => handleCheckboxChange(pin.id)}
              />
            </p>
            <img src={pin.media.images["400x300"].url} alt={pin.title} />
          </div>
        ))}
      </div>
      <button
        className={`${styles.button} ${styles.importButton}`}
        type="button"
        onClick={addSelectedPinsToMiroBoard}
        disabled={isLoading}
      >
        {isLoading ? "Importing..." : "Import"}
      </button>
    </div>
  );
}
