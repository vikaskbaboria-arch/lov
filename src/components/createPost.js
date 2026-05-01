import React, { useEffect, useState } from 'react'

const CreatePost = () => {
  const [caption, setCaption] = useState('')
  const [preview, setPreview] = useState(null)
  const [image, setImage] = useState(null)
  const [isAnonymous, setIsAnonymous] = useState(false)

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
    console.log('Upload response:', data)

    const postData = { pic: data?.data?.secure_url, caption, isAnonymous: Boolean(isAnonymous) }
    console.log('Sending post data:', postData)

    const res2 = await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })

    const data2 = await res2.json()
    console.log('Post response:', data2)
  }

  

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <div className="rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-800 to-purple-800 px-6 py-7 shadow-2xl shadow-fuchsia-500/20 ring-1 ring-white/10 sm:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Create a New Post</h2>
            <p className="mt-1 text-sm text-violet-100/85">
              Add a caption, upload an image, and share your story.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition shadow-lg ${
                isAnonymous
                  ? 'bg-violet-500 text-white shadow-violet-500/50'
                  : 'bg-white/20 text-white hover:bg-white/30 shadow-white/20'
              }`}
            >
              {isAnonymous ? '🔒 Anonymous' : '👤 Named'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!image}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-violet-700 shadow-lg shadow-white/20 transition hover:-translate-y-0.5 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Publish Post
            </button>
          </div>
        </div>

        <div className="space-y-5 rounded-[28px] bg-white/10 p-5 shadow-inner shadow-black/10 backdrop-blur-sm sm:p-6">
          <label className="block text-sm font-medium text-white/90">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write something about your image..."
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-violet-100/60 outline-none transition focus:border-white/70 focus:bg-white/20"
          />

          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white/90 shadow-sm shadow-black/10 transition hover:border-white/30">
              <p className="text-sm font-medium text-white/90">Upload image</p>
              <p className="mt-1 text-xs text-violet-100/70">JPEG, PNG, or GIF. Up to 5MB.</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="mt-3 w-full cursor-pointer rounded-xl border border-dashed border-white/20 bg-white/5 p-3 text-sm text-white/90 file:mr-4 file:rounded-full file:border-0 file:bg-violet-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-violet-400"
              />
            </div>

            {preview ? (
              <div className="overflow-hidden rounded-3xl border border-white/15 bg-black/20 shadow-lg shadow-black/20">
                <img src={preview} alt="preview" className="h-48 w-full object-cover" />
              </div>
            ) : (
              <div className="flex min-h-[12rem] items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/5 text-sm text-white/60">
                Image preview will appear here.
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/70">
          <span>{image ? `Selected file: ${image.name}` : 'No image selected yet'}</span>
          <span className="text-white/80">Tip: keep captions short and sweet.</span>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
