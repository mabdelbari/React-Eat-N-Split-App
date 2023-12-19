import { useState } from "react";
import { SplitBillForm } from "./SplitBillForm";
import { AddFriendForm } from "./AddFriendForm";
import { Button } from "./Button";
import { FriendsList } from "./FriendsList";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
    setSelectedFriend(null);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((selectedFriend) =>
      selectedFriend?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <>
      <section className="min-vh-100 d-flex justify-content-center align-items-center p-3">
        <div className="container">
          <div className="app">
            <div className="row gy-4">
              <div className="col-12 col-sm-10 col-md-6 offset-md-0 col-xl-5 offset-xl-1 col-xxl-4 offset-xxl-2 offset-sm-1">
                <div className="sidebar">
                  <FriendsList
                    friends={friends}
                    selectedFriend={selectedFriend}
                    onSelection={handleSelection}
                  />
                  {showAddFriend && (
                    <AddFriendForm onAddFriend={handleAddFriend} />
                  )}
                  <Button onClick={handleShowAddFriend}>
                    {showAddFriend ? "Close" : "Add Friend"}
                  </Button>
                </div>
              </div>
              <div className="col-12 col-sm-10 col-md-6 col-xl-5 col-xxl-4 offset-sm-1 offset-md-0">
                {selectedFriend && (
                  <SplitBillForm
                    selectedFriend={selectedFriend}
                    onSplitBill={handleSplitBill}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
