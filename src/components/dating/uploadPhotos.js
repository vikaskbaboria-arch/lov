"use client"
import React, { useState } from 'react'

const UploadPhotos = ({ setEdit }) => {
  const [photos, setPhotos] = useState([])
  const [error, setError] = useState("")
  const [uploading, setUploading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleImage = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 5) {
      setError("You can upload up to 5 photos.")
      setPhotos(files.slice(0, 5))
      return
    }

    setError("")
    setPhotos(files)
  }

  const handleSave = async () => {
    if (photos.length === 0) {
      setError("Please select at least one photo.")
      return
    }

    if (photos.length > 5) {
      setError("You can upload up to 5 photos.")
      return
    }

    setUploading(true)
    setError("")
    setSuccessMessage("")

    try {
      const formData = new FormData()
      photos.forEach((photo) => formData.append("images", photo))

      const uploadRes = await fetch("/api/upload/photos", {
        method: "POST",
        body: formData,
      })
      const uploadData = await uploadRes.json()
      if (!uploadRes.ok) {
        throw new Error(uploadData?.error || "Photo upload failed.")
      }

      const photoUrls = Array.isArray(uploadData.photos)
        ? uploadData.photos.map((item) => item.url).filter(Boolean)
        : []

      if (photoUrls.length === 0) {
        throw new Error("No photo URLs returned from upload.")
      }

      const saveRes = await fetch("/api/dating/uploadPhotos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photos: photoUrls }),
      })
      const saveData = await saveRes.json()
      if (!saveRes.ok) {
        throw new Error(saveData?.error || "Failed to save photos.")
      }

      setSuccessMessage("Photos uploaded successfully.")
      setPhotos([])
      setEdit(false)
    } catch (uploadError) {
      setError(uploadError.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="lov-overlay">
      <div className="lov-modal relative max-h-[90dvh] w-full max-w-4xl overflow-y-auto p-4 sm:p-6">
        <button
          onClick={() => setEdit(false)}
          className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-100"
          type="button"
        >
          ✕
        </button>

        <h2 className="text-xl text-neutral-50 font-semibold text-center mb-4">
          Upload Photos
        </h2>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-neutral-300">
            Select up to 5 images
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImage}
            className="block w-full max-w-full rounded-lg border border-neutral-800 bg-neutral-950 p-2 text-sm text-neutral-100"
          />

          {error && <p className="text-sm text-rose-400">{error}</p>}

          {photos.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-1"
                >
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Selected photo ${index + 1}`}
                    className="h-36 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {successMessage && (
            <p className="text-sm text-emerald-400">{successMessage}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setEdit(false)}
            className="lov-btn-ghost"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="lov-btn-primary"
            type="button"
            disabled={uploading}
          >
            {uploading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UploadPhotos
