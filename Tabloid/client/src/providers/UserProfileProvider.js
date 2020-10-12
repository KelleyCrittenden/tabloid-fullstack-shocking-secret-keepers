import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const apiUrl = "/api/userprofile";

  const userProfile = sessionStorage.getItem("userProfile");
  const activeUser = JSON.parse(userProfile);
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  const [allUserProfiles, setAllUserProfiles] = useState([]);
  const [singleUserProfile, setSingleUserProfile] = useState({ userType: {} });
  const [deactivatedUsers, setDeactivatedUsers] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const login = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUserProfile(signInResponse.user.uid))
      .then((userProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
        sessionStorage.setItem("userProfileId", JSON.stringify(userProfile.id));
        setIsLoggedIn(true);
      });
  };

  const logout = () => {
    return firebase.auth().signOut()
      .then(() => {
        sessionStorage.clear()
        setIsLoggedIn(false);
      });
  };

  const register = (userProfile, password) => {
    return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
      .then((createResponse) => saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid }))
      .then((savedUserProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
        sessionStorage.setItem("userProfileId", JSON.stringify(userProfile.id))
        setIsLoggedIn(true);
      });
  };

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const getUserProfile = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()));
  };

  const saveUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userProfile)
      }).then(resp => resp.json()));
  };

  const getAllUserProfiles = () => {
    return getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()))
      .then((resp) => setAllUserProfiles(resp));
  };

  const getUserProfileById = (userId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/details/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()))
      .then((resp) => setSingleUserProfile(resp));;
  };
  const deactivateUserProfile = (userId) => {

    return getToken().then((token) =>
      fetch(`${apiUrl}/deactivate/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }

      }));

  };

  const getDeactivatedUsers = () => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/deactivatedProfiles`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()))
      .then((resp) => setDeactivatedUsers(resp));
  };

  const reactivateUserProfile = (userId) => {

    return getToken().then((token) =>
      fetch(`${apiUrl}/reactivate/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }));

  };


  return (
    <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register, getToken, userProfile, activeUser, getAllUserProfiles, allUserProfiles, getUserProfileById, singleUserProfile, deactivatedUsers, getDeactivatedUsers, deactivateUserProfile, reactivateUserProfile }}>
      {isFirebaseReady
        ? props.children
        : <Spinner className="app-spinner dark" />}
    </UserProfileContext.Provider>
  );
}