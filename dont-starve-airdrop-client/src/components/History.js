import React from "react";
import { observer } from "mobx-react";
import HistoryItem from "./HistoryItem";

export default observer(function History({ history }) {
  if (history.length === 0)
    return (
      <div>
        <span className="text-gray-500">History is empty</span>
      </div>
    );
  return (
    <div className="flex flex-col gap-y-3">
      {[...history].reverse().map((item, index) => (
        <HistoryItem key={item.uuid} item={item} />
      ))}
    </div>
  );
});
