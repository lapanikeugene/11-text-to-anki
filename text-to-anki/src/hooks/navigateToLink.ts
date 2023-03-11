import { useNavigate } from "react-router-dom"
/**
 * custom hooks, useNavigate wrapper for buttons and functions
 * @returns function to open new links of router
 */
const useNavigateToLink=()=>{
    const navigate = useNavigate()


    const navigator = (link:string)=>(e:React.MouseEvent)=>{
        navigate(link);
    }
 


    return [navigator]
}

export default  useNavigateToLink;