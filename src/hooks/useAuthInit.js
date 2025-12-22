// import { useEffect, useState } from "react"
// import { initAuth } from "../store/actions/user.actions"

// export function useAuthInit(){
//     const [isAuthInitDone, setIsAuthInitDone] = useState(false)

//     useEffect(() => {
//         initAuth()
//             .catch(()=>{

//             })
//             .finally(()=>{
//                 setIsAuthInitDone(true)
//             })
//     }, [])

    
//     return {
//        isAuthInitDone 
//     }
// }