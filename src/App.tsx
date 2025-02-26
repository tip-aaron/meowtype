import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";

type Letter = {
  value: string;
  isTyped: boolean;
}

type Word = {
  value: Letter[];
  isTyped: boolean;
}

const words: Word[] = "Hello darkness, my old friend".split(" ").map((w) => {
  return {
    value:
      w.split("").map((l) => {
        return {
          value: l,
          isTyped: false
        }
      }),
    isTyped: false,
  }
});

function App() {
  const [sentence, setSentence] = useState(words);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  }

  return (
    <>
      <div onClick={focusInput} className={styles.typingContainer}>
        {sentence.map((w) => {

          return (
            <div className={cn}>
              {w.value.map((l) => (
                <span className={l.isTyped ? "typed" : ""}>{l.value}</span>
              ))}
            </div>
          );
        })}
        <input
          className="typing-input"
          aria-hidden="true"
          autoComplete="off"
          autoCapitalize="off"
          value={inputValue}
          autoFocus
          ref={inputRef}
        />
      </div>
    </>
  );
}

export default App;
