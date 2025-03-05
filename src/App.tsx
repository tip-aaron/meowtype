import { ChangeEvent, useEffect, useRef, useState } from "react";
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

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const remainingWords = sentence.slice(e.target.value.split(" ").length - 1);
    
    setSentence((prev) => {
      return prev.map((w) => {
        const newW = w.value.map((l) => {
          return l;
        });

        return {
          isTyped: newW.every((l) => l.isTyped),
          value: newW
        };
      })
    });
    
    setInputValue(e.target.value);
  }

  return (
    <>
      <div onClick={focusInput} className={styles.typingContainer}>
        {sentence.map((w, i) => {
          return (
            <div key={"word" + i} className={styles.word}>
              {w.value.map((l, i) => (
                <span key={"letter " + l + i} className={l.isTyped ? styles.typedLetter : ""}>{l.value}</span>
              ))}
            </div>
          );
        })}
        <input
          className={styles.typingInput}
          aria-hidden="true"
          autoComplete="off"
          autoCapitalize="off"
          onChange={inputOnChange}
          value={inputValue}
          ref={inputRef}
        />
      </div>
    </>
  );
}

export default App;
