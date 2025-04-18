import React from "react";

export default function NavBar() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-5">
        <p>Home</p>
        <p>Product</p>
        <p>Resources</p>
        <p>Support</p>
      </div>
      <div className="flex gap-5">
        <button>Login</button>
        <button>Get Started</button>
      </div>
    </div>
  );
}
