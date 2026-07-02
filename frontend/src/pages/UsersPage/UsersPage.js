import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./usersPage.module.css";
import Title from "../../components/Title/Title";
import { useAuth } from "../../hooks/useAuth"; // Assuming you have auth context to get the updated users

export default function UsersPage() {
  // Manually loading the sample users
  const initialUsers = [
    {
      id: 1,
      name: "Tonmoy Biswas",
      email: "tonmoy@gmail.com",
      password: "123",
      address: "Uttara,Dhaka-1230",
      isAdmin: true,
    },
    {
      id: 2,
      name: "Jawadul Hasan",
      email: "jawad@gmail.com",
      password: "123",
      address: "Mirpur",
      isAdmin: false,
    },
    {
      id: 3,
      name: "Saurov",
      email: "saurov@gmail.com",
      password: "123",
      address: "Bashundhara",
      isAdmin: false,
    },
    {
      id: 4,
      name: "Snigdha Biswas",
      email: "snigdha@gmail.com",
      password: "123",
      address: "Uttara-Dhaka",
      isAdmin: false,
    },
  ];

  const [users, setUsers] = useState(initialUsers); // Start with initial users
  const { user } = useAuth(); // Track user registration status

  // This effect runs whenever the user is updated (e.g., when a new user registers)
  useEffect(() => {
    if (user) {
      setUsers((prevUsers) => {
        // Check if the user's name already exists in the list before adding
        const isDuplicateName = prevUsers.some(
          (existingUser) => existingUser.name === user.name
        );
        if (!isDuplicateName) {
          return [...prevUsers, user]; // Append the new user if name is unique
        }
        return prevUsers; // Return existing list if user with the same name exists
      });
    }
  }, [user]); // Run this effect whenever `user` changes

  // Handle removing user (clearing user from list)
  const handleRemove = (userId) => {
    // Mark the user as removed in sessionStorage
    sessionStorage.setItem(`user-${userId}-removed`, "true");

    // Filter out the removed user from the current users list
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  // Check sessionStorage for previously removed users on page load
  useEffect(() => {
    const updatedUsers = users.filter((user) => {
      const isRemoved = sessionStorage.getItem(`user-${user.id}-removed`);
      return !isRemoved; // Only keep users who are not marked as removed
    });

    setUsers(updatedUsers);
  }, [users]);

  return (
    <div className={classes.container}>
      <Title title="Manage Users" />
      <div className={classes.list}>
        <div className={classes.list_item}>
          <h3>Name</h3>
          <h3>Email</h3>
          <h3>Address</h3>
          <h3>Admin</h3>
          <h3>Actions</h3>
        </div>
        {users.map((user) => (
          <div key={user.id} className={classes.list_item}>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.address}</span>
            <span>{user.isAdmin ? "✅" : "❌"}</span>
            <span className={classes.actions}>
              {/* Remove button */}
              <button onClick={() => handleRemove(user.id)}>Remove</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
