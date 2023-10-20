import styles from "./Button.module.css";

export default function Button({ children, onClick, size = "short" }) {
  let classname = styles.button;

  if (size === "long") {
    classname += " " + styles.longButton;
  } else {
    classname += " " + styles.shortButton;
  }

  classname +=
    " inline-flex items-center justify-center px-4 py-4 text-large text-amber-950 font-sans font-bold";

  return (
    <button className={classname} onClick={onClick}>
      <div className={styles.buttonInner}>{children}</div>
    </button>
  );
}
