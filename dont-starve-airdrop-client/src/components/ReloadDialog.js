import classnames from "classnames";
import Button from "./Button";
import styles from "./ReloadDialog.module.css";

export default function ReloadDialog({ message }) {
  return (
    <div
      className={classnames(styles.reloadDialog, "max-w-xl mx-auto")}
    >
      <div className="flex flex-col items-center justify-center px-14 py-10">
      <div className="font-sans text-medium">
          To use the Airdrop Mod Client, please make sure you have the Airdrop Mod Server running on your local machine. For more details, visit <a className="underline" href="https://github.com/mutoo/dont-starve-airdrop-mod" alt="Airdrop mod repo">this github link</a>.
        </div>
        <div className="my-2"></div>
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
