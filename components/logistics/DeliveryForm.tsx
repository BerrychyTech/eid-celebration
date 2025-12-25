"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import VerificationModal from "./VerificationModal";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

/* =========================
   ✅ SCHEMA (EXTENDED)
   ========================= */
const schema = z.object({
  id: z.string().optional(), // public delivery ID (backend may override)
  senderName: z.string().min(1, "Sender name is required"),
  receiverName: z.string().min(1, "Receiver name is required"),
  receiverPhone: z
    .string()
    .min(10, "Receiver phone is required"),

  pickupState: z.string().min(1, "Pickup state is required"),
  pickupTown: z.string().min(1, "Pickup town is required"),
  destinationState: z.string().min(1, "Destination state is required"),
  destinationTown: z.string().min(1, "Destination town is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  images: z.any().refine(
    (files) => files?.length > 0,
    "At least one image is required"
  ),
});

type FormData = z.infer<typeof schema>;

export default function DeliveryForm() {
  const [modalType, setModalType] =
    useState<null | "submitted" | "verified" | "mismatch">(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [correctCategory, setCorrectCategory] =
    useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  /* =========================
     ✅ API HELPERS
     ========================= */
  const getAuthHeader = () => {
    const token = useAuthStore.getState().token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const uploadImages = async (files: FileList): Promise<string[]> => {
    return Array.from(files).map(
      (file) => `/uploads/deliveries/${file.name}`
    );
  };

  /* =========================
     ✅ SUBMIT (EXTENDED)
     ========================= */
  const onSubmit = async (data: FormData) => {
    setModalType("submitted");

    try {
      const imageUrls = await uploadImages(data.images);

      const payload = {
        id: data.id,
        senderName: data.senderName,
        receiverName: data.receiverName,
        receiverPhone: data.receiverPhone,

        pickupState: data.pickupState,
        pickupTown: data.pickupTown,
        destinationState: data.destinationState,
        destinationTown: data.destinationTown,
        category: data.category,
        description: data.description,
        images: imageUrls,
        estimatedFee: 1200,
      };

      await api.post("/deliveries", payload, {
        headers: getAuthHeader(),
      });

      setTimeout(() => {
        const match = Math.random() > 0.5;
        if (match) {
          setModalType("verified");
        } else {
          setCorrectCategory("Fragile Items");
          setModalType("mismatch");
        }
      }, 3000);

    } catch (err: any) {
      console.error("❌ Delivery submit error:", err);
      alert(err.response?.data?.error || "Failed to submit delivery");
      setModalType(null);
    }
  };

  const watchPickupState = watch("pickupState");
  const watchDestinationState = watch("destinationState");

  const handleImagePreview = (files: FileList | null) => {
    if (!files) return;
    setImagePreviews(
      Array.from(files).map((file) => URL.createObjectURL(file))
    );
  };

  const states = ["Kano", "Jigawa"];
  const townsMap: Record<string, string[]> = {
    Kano: ["Kano"],
    Jigawa: ["Gumel", "Dutse", "Hadejia"],
  };

  useEffect(() => {
    if (watchPickupState) {
      setValue(
        "destinationState",
        watchPickupState === "Kano" ? "Jigawa" : "Kano"
      );
      setValue("destinationTown", "");
    }
  }, [watchPickupState, setValue]);

  useEffect(() => {
    if (watchDestinationState) {
      setValue(
        "pickupState",
        watchDestinationState === "Kano" ? "Jigawa" : "Kano"
      );
      setValue("pickupTown", "");
    }
  }, [watchDestinationState, setValue]);

  const categories = [
    "Small Box","Medium Box","Large Box","Sack – Small","Sack – Big",
    "Envelope / Documents","Electronics","Fragile Items",
    "Clothes / Fabric Bag","Foodstuff (non-perishable)",
    "Grocery Bag","Household Items","Personal Items",
    "Wholesale Sack (Big)","Carton Goods","Packed Drinks",
    "Retail Bags","Industrial Samples","Luggage",
    "Shoes / Fashion Products","Books","Office Items",
    "Spare Parts","Light Tools","Custom Category"
  ];

  return (
    <section className="p-6 bg-cardBg dark:bg-dark-cardBg rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Request Delivery</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Customer & Parties */}
        <input {...register("senderName")} placeholder="Sender Name" className="p-3 rounded-lg bg-formBg w-full" />
        <input {...register("receiverName")} placeholder="Receiver Name" className="p-3 rounded-lg bg-formBg w-full" />
        <input {...register("receiverPhone")} placeholder="Receiver Phone" className="p-3 rounded-lg bg-formBg w-full" />

        {/* Pickup State */}
        <div>
        <label htmlFor="pickupState" className="block mb-1 font-medium">Pickup State</label>  
          <select id="pickupState" {...register("pickupState")} className="p-3 rounded-lg bg-formBg dark:bg-dark-formBg w-full">
            <option value="">Select Pickup State</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.pickupState?.message && <p className="text-red-500 text-sm mt-1">{errors.pickupState.message as string}</p>}
        </div>

        {/* Pickup Town */}
        <div>
          <label htmlFor="pickupTown" className="block mb-1 font-medium">Pickup Town</label>  
          <select  id="pickupTown" {...register("pickupTown")} className="p-3 rounded-lg bg-formBg dark:bg-dark-formBg w-full">
            <option value="">Select Pickup Town</option>
            {watchPickupState && townsMap[watchPickupState].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.pickupTown?.message && <p className="text-red-500 text-sm mt-1">{errors.pickupTown.message as string}</p>}
        </div>

        {/* Destination State */}
        <div>
          <label htmlFor="destinationState" className="block mb-1 font-medium">Destination State</label>  
          <select id="destinationState" {...register("destinationState")} className="p-3 rounded-lg bg-formBg dark:bg-dark-formBg w-full" disabled>
            <option value="">Destination State</option>
            {watchPickupState ? [watchPickupState === "Kano" ? "Jigawa" : "Kano"].map(s => <option key={s} value={s}>{s}</option>) : null}
          </select>
        </div>

        {/* Destination Town */}
        <div>
          <label htmlFor="destinationTown" className="block mb-1 font-medium">Destination Town</label>  
          <select id="destinationTown" {...register("destinationTown")} className="p-3 rounded-lg bg-formBg dark:bg-dark-formBg w-full">
            <option value="">Select Destination Town</option>
            {watchDestinationState && townsMap[watchDestinationState].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.destinationTown?.message && <p className="text-red-500 text-sm mt-1">{errors.destinationTown.message as string}</p>}
        </div>

        {/* Package Category */}
        <div className="md:col-span-2">
          <label htmlFor="packageCategory" className="block mb-1 font-medium">Package Category</label>  
          <select id="packageCategory" {...register("category")} className="p-3 rounded-lg bg-formBg dark:bg-dark-formBg w-full">
            <option value="">Select Package Category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          {errors.category?.message && <p className="text-red-500 text-sm mt-1">{errors.category.message as string}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block mb-1 font-medium">Package Description</label>  
          <textarea id="description" {...register("description")} placeholder="Describe the package" className="p-3 rounded-lg bg-formBg dark:bg-dark-formBg w-full" />
          {errors.description?.message && <p className="text-red-500 text-sm mt-1">{errors.description.message as string}</p>}
        </div>

        {/* Upload Images */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">Upload Package Images</label>
          <input type="file" multiple {...register("images")} onChange={e => handleImagePreview(e.target.files)} />
          {errors.images?.message && <p className="text-red-500 text-sm mt-1">{errors.images.message as string}</p>}
          <div className="flex gap-3 mt-3 flex-wrap">
            {imagePreviews.map((src, idx) => <Image key={idx} src={src} alt="preview" width={100} height={100} className="rounded-lg" />)}
          </div>
        </div>

        {/* Estimated Fee */}
        <div className="p-3 bg-accentBg dark:bg-dark-accentBg rounded-lg col-span-1 md:col-span-2 text-sm">
          Estimated Delivery Fee: <strong>₦1,200</strong>
        </div>

        {/* Submit */}
        <button type="submit" className="bg-primary text-white py-3 rounded-lg col-span-1 md:col-span-2">
          Request Delivery
        </button>
      </form>

      {modalType && (
        <VerificationModal
          type={modalType}
          setType={setModalType}
          correctCategory={correctCategory}
        />
      )}
    </section>
  );
}
