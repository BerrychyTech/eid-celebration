"use client";

import { useState } from "react";
import TextInput from "@/components/auth/fields/TextInput";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

export default function ApplyForm() {
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [ninFile, setNinFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const token = useAuthStore.getState().token;
  
  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLicenseFile(e.target.files[0]);
    }
  };

  const handleNinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNinFile(e.target.files[0]);
    }
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", (e.currentTarget.elements.namedItem("fullname") as HTMLInputElement).value);
    formData.append("email", (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value);
    formData.append("phone", (e.currentTarget.elements.namedItem("phone") as HTMLInputElement).value);
    formData.append("city", (e.currentTarget.elements.namedItem("city") as HTMLInputElement).value);
    formData.append("vehicle", (e.currentTarget.elements.namedItem("vehicle") as HTMLInputElement).value);
    formData.append("gender", (e.currentTarget.elements.namedItem("gender") as HTMLInputElement).value);
    formData.append("state", (e.currentTarget.elements.namedItem("state") as HTMLInputElement).value);
    formData.append("lga", (e.currentTarget.elements.namedItem("lga") as HTMLInputElement).value);
    formData.append("nin", (e.currentTarget.elements.namedItem("nin") as HTMLInputElement).value);


    if (licenseFile) formData.append("driverLicense", licenseFile);
    if (ninFile) formData.append("ninImage", ninFile);

    try {
      const response = await api.post("/driver/admin/register", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },}); 
      console.log("Server response:", response.data);
      alert(`Application submitted! ID: ${response.data.applicationId}`);
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto" id="apply">
      <h1 className="text-2xl font-bold mb-4">Register Driver (Manual)</h1>
      <form
        className="space-y-6 bg-card dark:bg-dark-card p-8 rounded-2xl shadow"
        onSubmit={handleSubmit}
      >
        <TextInput id="fullname" label="Full Name" placeholder="Enter your full name" />
        <TextInput id="email" label="Email Address" type="email" placeholder="Enter your email" />
        <TextInput id="phone" label="Phone Number" placeholder="0812 345 6789" />
        <TextInput id="city" label="City" placeholder="Your current city" />
        <TextInput id="vehicle" label="Vehicle Type you can drive" placeholder="Sharon, Golf, etc." />
        <TextInput id="gender" label="Gender" placeholder="male / female / other" />
        <TextInput id="state" label="State" placeholder="Lagos" />
        <TextInput id="lga" label="Local Government Area" placeholder="Ikeja" />
        <TextInput id="nin" label="NIN Number" placeholder="12345678901" />

        {/* Driver License Upload */}
        <div>
          <label className="block mb-2 font-semibold">Upload Your Driver's License</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleLicenseChange}
            className="w-full border rounded-md p-2"
          />
          {licenseFile && (
            <p className="mt-2 text-sm text-green-600">{licenseFile.name} selected</p>
          )}
        </div>

        {/* NIN Upload */}
        <div>
          <label className="block mb-2 font-semibold">Upload Your NIN Card</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleNinChange}
            className="w-full border rounded-md p-2"
          />
          {ninFile && (
            <p className="mt-2 text-sm text-green-600">{ninFile.name} selected</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary/90"
        >
          Submit Application
        </button>
      </form>
    </section>
  );
}
