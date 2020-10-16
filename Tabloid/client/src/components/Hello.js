import React, { useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Hello() {
  const { activeUser } = useContext(UserProfileContext);
  let time = new Date();
  if (time.getHours() < 12) {
    return (
      <span style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: "50%",
        marginTop: "-0.5rem",
        textAlign: "center",
      }}>Hello, Good Morning {activeUser.displayName}</span>
    );
  }
  else if ((time.getHours() < 18 && time.getHours() >= 12)) {
    return (
      <span style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: "50%",
        marginTop: "-0.5rem",
        textAlign: "center",
      }}>Hello, Good Afternoon {activeUser.displayName}</span>
    );
  }
  else {
    return (
      <span style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: "50%",
        marginTop: "-0.5rem",
        textAlign: "center",
      }}>Hello, Good Evening {activeUser.displayName}</span>
    );

  }

}