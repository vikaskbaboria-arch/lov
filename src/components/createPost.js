import React, { useEffect, useState } from 'react'
import  Image  from 'next/image';

const CreatePost = ({setOpen}) => {
  const [caption, setCaption] = useState('')
  const [preview, setPreview] = useState(null)
  const [image, setImage] = useState(null)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const[close,setClose] = useState(false)
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!image) return

    const formdata = new FormData()
    formdata.append('image', image)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formdata,
    })

    const data = await res.json()

    const postData = { pic: data?.data?.secure_url, caption, isAnonymous: Boolean(isAnonymous) }

    await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })
  }

  if(close){
    return null;
  }

  return (
    <div className="lov-overlay" onClick={() => setOpen(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="lov-modal relative max-w-2xl p-6 sm:p-8"
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-100"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral-50">Create a New Post</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Add a caption, upload an image, and share your story.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition ${
                isAnonymous
                  ? 'bg-pink-500 text-white'
                  : 'border border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              {isAnonymous ? 'Anonymous' : 'Named'}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!image}
              className="lov-btn-primary rounded-full disabled:cursor-not-allowed"
            >
              Publish Post
            </button>
          </div>
        </div>

        <div className="space-y-5 rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 sm:p-6">
          <label className="block text-sm font-medium text-neutral-300">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write something about your image..."
            className="lov-input"
          />

          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-4">
              <p className="text-sm font-medium text-neutral-200">Upload image</p>
              <p className="mt-1 text-xs text-neutral-500">JPEG, PNG, or GIF. Up to 5MB.</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="mt-3 w-full cursor-pointer rounded-lg border border-dashed border-neutral-700 bg-neutral-950 p-3 text-sm text-neutral-300 file:mr-4 file:rounded-full file:border-0 file:bg-pink-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-pink-600"
              />
            </div>

            {preview ? (
              <div className="overflow-hidden rounded-xl border border-neutral-800">
                <Image src={preview} alt="preview" width={192} height={192} className="h-48 w-full object-cover" />
              </div>
            ) : (
              <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-neutral-800 bg-neutral-900/50 text-sm text-neutral-500">
                Image preview will appear here.
              </div>
            )}
          </div>
        </div>

        <p className="mt-4 text-sm text-neutral-500">
          {image ? `Selected file: ${image.name}` : 'No image selected yet'}
        </p>
      </div>
    </div>
  )
}

export default CreatePost
