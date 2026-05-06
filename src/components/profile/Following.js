
"use client"
const Following = ({ following = [] ,onClose}) => {
  if (!following?.length) {
    return <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900 text-white p-4'>No following yet.</div>
  }
  console.log('Following data:', following);

  return (
    <>
      {/* 🔹 Overlay (for outside click) */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* 🔹 Dropdown (relative to parent button) */}
      <div
        className="absolute top-full left-0 mt-2 z-50 w-72 bg-slate-900 text-white rounded-xl shadow-lg p-4 max-h-60 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {following.length === 0 ? (
          <p>No following yet.</p>
        ) : (
          following.map((user) => (
            <div
              key={user._id || user.username}
              className="flex items-center gap-3 mb-3"
            >
              <img
                src={user.profilePic || "https://via.placeholder.com/48"}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <p>{user.username}</p>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Following