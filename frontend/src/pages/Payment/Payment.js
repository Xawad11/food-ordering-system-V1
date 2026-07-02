import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaMoneyBillAlt, FaCreditCard } from "react-icons/fa";
import { jsPDF } from "jspdf";
import emailjs from "emailjs-com";
import classes from "./payment.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const location = useLocation();
  const { name, address, email, items } = location.state || {
    name: "",
    address: "",
    email: "tonmoy.biswas.sj@gmail.com", // Fixed email
    items: [],
  };

  const totalPrice = items.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

  const sendEmail = async (method) => {
    const templateParams = {
      customer_name: name,
      customer_email: email, // Fixed email
      customer_address: address,
      total_amount: totalPrice.toFixed(2),
      payment_method: method,
    };

    try {
      const response = await emailjs.send(
        "service_eu9xw6a", // Replace with actual EmailJS service ID
        "template_qt6jdsk", // Replace with actual template ID
        templateParams,
        "A1kY0qfl5t-WiUJCt" // Replace with actual public key
      );
      console.log("Email sent successfully!", response.status, response.text);

      // Show success notification
      toast.success(`Email sent for ${method} payment!`);
    } catch (error) {
      console.error("Failed to send email.", error);

      // Show error notification
      toast.error("Failed to send email. Please try again.");
    }
  };

  const handlePaymentChoice = (method) => {
    setPaymentMethod(method);
    sendEmail(method); // Send email after selecting payment method

    if (method === "Cash on Delivery") {
      alert(
        "You have chosen Cash on Delivery. Please pay upon receiving your order."
      );
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 20, 20);
    doc.setFontSize(12);
    doc.text(`Customer Name: ${name}`, 20, 30);
    doc.text(`Customer Address: ${address}`, 20, 40);
    doc.text("Ordered Items:", 20, 50);
    doc.text("Item", 20, 60);
    doc.text("Quantity", 80, 60);
    doc.text("Price (BDT)", 140, 60);
    doc.line(20, 62, 180, 62);

    let y = 70;
    items.forEach((item) => {
      doc.text(item.name, 20, y);
      doc.text(String(item.quantity), 80, y);
      doc.text(`${(item.price || 0) * item.quantity} BDT`, 140, y);
      y += 10;
    });

    doc.line(20, y, 180, y);
    doc.text(`Total Amount: ${totalPrice.toFixed(2)} BDT`, 20, y + 10);
    if (paymentMethod) {
      doc.text(`Payment Method: ${paymentMethod}`, 20, y + 20);
    }

    doc.save(`Invoice_${name}.pdf`);
  };

  const initiatePayment = () => {
    sendEmail("Credit/Debit/Mobile Banking"); // Send email for Credit/Debit/Mobile Banking
    const paymentData = {
      store_id: "quick67e1a1b629da0",
      store_passwd: "quick67e1a1b629da0@ssl",
      total_amount: totalPrice.toFixed(2),
      currency: "BDT",
      tran_id: `TXN_${Date.now()}`,
      success_url: `${window.location.origin}/payment-success`,
      fail_url: `${window.location.origin}/payment-fail`,
      cancel_url: `${window.location.origin}/payment-cancel`,
      ipn_url: `${window.location.origin}/api/payment/ipn`,
      shipping_method: "Courier",
      product_name: "Food Order",
      product_category: "Food",
      product_profile: "general",
      cus_name: name,
      cus_email: email, // Fixed email
      cus_add1: address,
      cus_city: "Dhaka",
      cus_postcode: "1207",
      cus_country: "Bangladesh",
      cus_phone: "01700000000",
      ship_name: name,
      ship_add1: address,
      ship_city: "Dhaka",
      ship_postcode: "1207",
      ship_country: "Bangladesh",
      ship_phone: "01700000000",
    };

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

    Object.keys(paymentData).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = paymentData[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className={classes.paymentContainer}>
      <h2>Invoice</h2>
      <p>
        <strong>Customer Name:</strong> {name}
      </p>
      <p>
        <strong>Customer Address:</strong> {address}
      </p>
      <p>
        <strong>Customer Email:</strong> {email}
      </p>
      <h3>Ordered Items</h3>
      <table className={classes.invoiceTable}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price (BDT)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{((item.price || 0) * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Amount</h3>
      <p>
        <strong>{totalPrice.toFixed(2)} BDT</strong>
      </p>
      <h3>Choose your payment option</h3>
      <ol className={classes.paymentList}>
        <li onClick={() => handlePaymentChoice("Cash on Delivery")}>
          <FaMoneyBillAlt /> Cash on Delivery
        </li>
        <li>
          <button onClick={initiatePayment}>
            <FaCreditCard /> Credit/Debit Card/Mobile Banking
          </button>
        </li>
      </ol>
      {paymentMethod && (
        <div className={classes.paymentMethodBox}>
          You selected: <strong>{paymentMethod}</strong>
        </div>
      )}
      <button className={classes.printButton} onClick={handleDownloadPDF}>
        Download PDF
      </button>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default Payment;