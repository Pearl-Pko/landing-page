import { Button } from "@/components/Button";
import React from "react";

export default function NavBar() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-10">
        <p className="text-white">Home</p>
        <p className="text-secondary">Product</p>
        <p className="text-secondary">Resources</p>
        <p className="text-secondary">Support</p>
        <p className="text-secondary">Pricing</p>
      </div>
      <div className="flex gap-5">
        <Button variant="secondary" text="Login" />
        <Button text="Get Started">Get Started</Button>
      </div>
    </div>
  );
}
