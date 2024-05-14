import React from "react";
import "./css/about.css";
import Footer from './Footer'; 

const AboutUs = () => {
  return (
    <>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "36px" }}>
        <p style={{ marginBottom: "16px", fontSize: "3rem", fontWeight: "bold", textAlign: "center", color: "#1F2937" }}>
          About Us
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "32px" }}>
            <div style={{ width: "50%" }}>
              <h2 style={{ color: "#6c3ad7", fontWeight: "bold", fontSize: "2.15rem", lineHeight: "1.20" }}>
                At Sri Velaa Supermarket, we're passionate about lowering food prices.
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: "1.5", marginTop: "24px", color: "#718096" }}>
                At Sri Velaa Supermarket, our mission is to ensure that you can provide your family with quality food without straining your budget. Established to serve our community, Sri Velaa Supermarket has been committed to offering an exceptional low-price grocery shopping experience since our inception. We take pride in providing fresh, high-quality food at affordable prices, set in a welcoming, easy-to-navigate store environment with friendly staff.
                Our goal remains unchanged: to be your go-to destination for value-packed groceries that meet your family's needs.
                <br/><br/>
                Whether you're shopping for a food enthusiast or looking for a versatile gift, Sri Velaa Supermarket gift cards are the ideal present for friends, family, and colleagues. Not just for foodies, Sri Velaa Supermarket offers a diverse range of gift cards suitable for various occasions, whether you're celebrating a new arrival or expressing gratitude.
                Share the gift of choice by purchasing Sri Velaa Supermarket gift cards, available at all our convenient locations.
              </p>
            </div>
            <div style={{ width: "50%" }}>
              <img src="https://hips.hearstapps.com/hmg-prod/images/09dce7b7-ea40-406b-a2c0-a3f57c420b17-1657946362.jpeg?crop=0.660xw:1.00xh;0.0794xw,0&resize=640:*" alt="grocery" style={{ width: "100%", height:"90%"}} />
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <div>
              <h2 style={{ fontWeight: "bold", fontSize: "2.25rem", lineHeight: "1.4", color: "#6c3ad7" }}>
                Our Mission
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: "1.5", marginTop: "24px", color: "#718096" }}>
                Our three guarantees provide value and help make your dollar go further. Find hundreds of low prices in-store and save on your weekly visit. Here's how: We'll provide you with a rain check coupon if you can't find an item in-store during the current week of our flyer. Found a lower price at another supermarket? No problem! Bring in their flyer and we'll automatically price match everyday staples. Our Double Fresh Guarantee means if you're not completely satisfied with an item purchased at BigBasket,
                we'll refund your money and replace the item. We also offer Locked and Low prices on select items so you'll always know what they'll cost. Sri velaa supermarket money-saving guarantees are here to serve you better.
                At Sri Velaa and Chalo! Sri Velaa Supermarket, we do everything we can to improve and contribute to the communities we call home.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
