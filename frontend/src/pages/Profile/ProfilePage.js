import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import classes from "./profilePage.module.css";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();

  // State for handling success message
  const [successMessage, setSuccessMessage] = useState("");

  // Form handling
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submit = (userData) => {
    // Simulate successful update and show success message
    setSuccessMessage("Profile successfully updated!");

    // Temporarily update the user data in the UI
    user.name = userData.name;
    user.address = userData.address;

    // Here, instead of calling updateProfile, you can simulate success and ignore axios call
    // updateProfile(userData);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Update Profile" />

        {/* Show success message temporarily */}
        {successMessage && (
          <div className={classes.successMessage}>{successMessage}</div>
        )}

        <form onSubmit={handleSubmit(submit)}>
          <Input
            defaultValue={user.name}
            type="text"
            label="Name"
            {...register("name", {
              required: true,
              minLength: 5,
            })}
            error={errors.name}
          />
          <Input
            defaultValue={user.address}
            type="text"
            label="Address"
            {...register("address", {
              required: true,
              minLength: 10,
            })}
            error={errors.address}
          />

          <Button type="submit" text="Update" backgroundColor="#009e84" />
        </form>
      </div>
    </div>
  );
}
