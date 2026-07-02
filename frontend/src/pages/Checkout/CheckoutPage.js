import React, { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com"; // Import emailjs-com for email sending
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the required CSS for toast
import classes from "./checkoutPage.module.css";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList";
import Map from "../../components/Map/Map";

export default function CheckoutPage() {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    ...cart,
    addressLatLng: cart.addressLatLng || { lat: 23.8103, lng: 90.4125 }, // Default: Dhaka, Bangladesh
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const sendEmail = async (data) => {
    const templateParams = {
      customer_name: data.name,
      customer_email: "tonmoy.biswas.sj@gmail.com", // Fixed email
      customer_address: data.address,
      total_amount: order.items
        .reduce((total, item) => total + (item.price || 0) * item.quantity, 0)
        .toFixed(2),
      payment_method: "Not selected", // Set payment method as 'Not selected'
    };

    console.log("Sending email with params:", templateParams); // Debug the params

    // Temporarily commenting out the email sending functionality
    // try {
    //   const response = await emailjs.send(
    //     "service_eu9xw6a", // Replace with your actual service ID
    //     "template_qt6jdsk", // Replace with your actual template ID
    //     templateParams,
    //     "A1kY0qfl5t-WiUJCt" // Replace with your actual public key
    //   );
    //   console.log("Email sent successfully!", response.status, response.text);
    //   // Show success toast notification
    //   toast.success(
    //     "Your Order is Successfully Placed & sent it to the Customer's Gmail!"
    //   );
    // } catch (error) {
    //   console.error("Failed to send email.", error);
    //   // Show error toast notification
    //   toast.error("Failed to send email.");
    // }
  };

  const submit = async (data) => {
    if (!order.addressLatLng) {
      console.log("Please select your location on the map");
      return;
    }

    try {
      const newOrder = {
        ...order,
        name: data.name,
        address: data.address,
      };

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      existingOrders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(existingOrders));

      // Send the email after order creation
      await sendEmail(data);
    } catch (error) {
      console.error("Error during order creation or email sending:", error);
    }

    // Navigate to payment page
    navigate("/payment", {
      state: {
        name: data.name,
        address: data.address,
        items: order.items.map((item) => ({
          name: item.food.name,
          price: item.food.price,
          quantity: item.quantity,
        })),
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.inputs}>
            <Input
              defaultValue={user?.name || ""}
              label="Name"
              {...register("name", { required: "Name is required" })}
              error={errors.name}
            />
            <Input
              defaultValue={user?.address || ""}
              label="Address"
              {...register("address", { required: "Address is required" })}
              error={errors.address}
            />
          </div>

          <div className={classes.order_summary}>
            <Title title="Your Ordered Items" fontSize="1.4rem" />
            {order.items && order.items.length > 0 ? (
              <OrderItemsList order={order} />
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>

        <div>
          <Title title="Choose Your Location" fontSize="1.6rem" />
          <Map
            location={order.addressLatLng}
            onChange={(latlng) => {
              console.log("Map returned LatLng:", latlng);
              if (!latlng) {
                console.error("LatLng is undefined");
                return;
              }
              setOrder((prev) => ({ ...prev, addressLatLng: latlng }));
            }}
          />
        </div>
        <Title title="Confirm Your Order" fontSize="1.6rem" />
        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <Button
              type="submit"
              text="Go To Payment"
              width="100%"
              height="3rem"
            />
          </div>
        </div>
      </form>

      {/* Toast container to show notifications */}
      <ToastContainer />
    </>
  );
}
