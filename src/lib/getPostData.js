 async  function getPostData (req){
    try {
        const res = await fetch("/api/post",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
             
        }
        
    
    )
        const data = await res.json()
        console.log("Fetched post data:", data.posts)
        return data.posts 
    } catch (error) {
        console.error("Error fetching post data:", error)
        throw error
    }
}

export default getPostData  