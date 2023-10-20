import classnames from "classnames";
import Button from "./Button";
import styles from "./ReloadDialog.module.css";

export default function ReloadDialog({ message }) {
  return (
    <div
      className={classnames(styles.reloadDialog, "relative max-w-xl mx-auto")}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-14 py-10">
        <div className="font-sans font-bold text-large">
          Could not connect to server: {message}
        </div>
        <div className="my-2"></div>
        <Button
          size="long"
          onClick={() => {
            window.location.reload();
          }}
        >
          Reload
        </Button>
      </div>
    </div>
  );
}
