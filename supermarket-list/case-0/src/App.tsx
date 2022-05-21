import type { Item } from "./types";

import { useEffect, useState } from "react";

import styles from "./App.module.scss";
import api from "./api";

function App() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    api.list().then(setItems);
  }, []);

  const removeItem = (id: Item["id"]) => {
    const itemsWithRemovedItem = items?.filter(({ id: _id }) => id !== _id);

    setItems(itemsWithRemovedItem);
  };

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form>
        <input autoFocus name="text" type="text" />
        <button>Add</button>
      </form>
      <ul>
        {items?.map((item) => (
          <li key={item.id} className={item.completed ? styles.completed : ""}>
            {item.text} <button onClick={() => removeItem(item.id)}>[X]</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
