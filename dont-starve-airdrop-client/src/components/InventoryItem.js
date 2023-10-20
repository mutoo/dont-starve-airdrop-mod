import classnames from "classnames";
import styles from "./InventoryItem.module.css";

export default function InventoryItem({
  name,
  image,
  count,
  onClick = () => {},
}) {
  return (
    <button
      className={classnames(
        styles.inventoryItemButton,
        "inventory-item inline-block relative w-12 h-12"
      )}
      title={count ? `${name} x ${count}` : name}
      onClick={onClick}
    >
      <img className="absolute inset-0" src={image} alt={name} />
      {count > 0 ? (
        <span
          className={classnames(
            styles.itemCount,
            "absolute top-1 inset-x-0 font-serif text-white text-center"
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
