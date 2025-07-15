import { useDispatch, useSelector } from "react-redux"

export const ReduxComponent = () => {
    const dispatch = useDispatch();
    const mycarts = useSelector((state)=> state)
    console.log(mycarts)

return {
    
}
}