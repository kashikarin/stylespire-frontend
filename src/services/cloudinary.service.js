import axios from 'axios'

export async function uploadToCloudinary(file) {
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  const data = new FormData()
  data.append("file", file)
  data.append('upload_preset', UPLOAD_PRESET)
  data.append("folder", "stylespire")

  const res = await axios(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  )

  if (!res.ok) {
    throw new Error("Failed to upload image");
  }

  return res.data.secure_url;
}