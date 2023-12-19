import { useState } from "react";
import { Button } from "./Button";

export function SplitBillForm({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  function handleClear() {
    setBill("");
    setPaidByUser("");
    setWhoIsPaying("user");
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split A Bill with {selectedFriend.name}</h2>

      <div className="d-flex flex-wrap gap-2">
        <label>💰 Bill value</label>
        <input
          type="text"
          value={bill}
          onChange={(e) => setBill(+e.target.value)}
        />
      </div>

      <div className="d-flex flex-wrap gap-2">
        <label>🧍‍♀️ Your expense</label>
        <input
          type="text"
          value={paidByUser}
          onChange={(e) =>
            setPaidByUser(+e.target.value < bill ? +e.target.value : paidByUser)
          }
        />
      </div>

      <div className="d-flex flex-wrap gap-2">
        <label>👫 {selectedFriend.name}'s expense</label>
        <input type="text" value={paidByFriend} disabled />
      </div>

      <div className="d-flex flex-wrap gap-2">
        <label>🤑 Who is paying the bill?</label>
        <select
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
      </div>
      <Button>Split Bill</Button>
      <Button onClick={handleClear}>Clear Bill</Button>
    </form>
  );
}
