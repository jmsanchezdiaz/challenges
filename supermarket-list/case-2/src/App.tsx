import type { Item } from "./types";

import { useEffect, useState } from "react";

import styles from "./App.module.scss";
import api from "./api";

const DELAY: number = 1000;
interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, toggleLoading] = useState<boolean>(true);

  function handleToggle(id: Item["id"]) {
    const mappedItems: Item[] = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );

    setItems(mappedItems);
  }

  function handleAdd(event: React.ChangeEvent<Form>) {
    event.preventDefault();
    const input: HTMLInputElement = event.target.text;

    if (!input.value.length) return;

    setTimeout(() => {
      setItems((items) =>
        items.concat({
          id: +new Date(),
          completed: false,
          text: input.value,
        })
      );
      input.value = "";
    }, DELAY);
  }

  function handleRemove(id: Item["id"]) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    api
      .list()
      .then(setItems)
      .finally(() => toggleLoading(false));
  }, []);

  if (isLoading) return "Loading...";

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form onSubmit={handleAdd}>
        <input required name="text" type="text" />
        <button>Add</button>
      </form>
      <ul>
        {items?.map((item) => (
          <li
            key={item.id}
            className={item.completed ? styles.completed : ""}
            onClick={() => handleToggle(item.id)}
          >
            {item.text}{" "}
            <button onClick={() => handleRemove(item.id)}>[X]</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
