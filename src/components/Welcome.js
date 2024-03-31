import React, { useContext } from "react";
import { ModalContext } from "../context/Modalcontext";

const Welcome=()=>{
    const{hideModal}=useContext(ModalContext)
    return(
        <div className="welcome">
                <div ><h1 > Hello Adrian! Are you Ready ?</h1>
            <button  onClick={hideModal}>Ok</button></div>
            


        </div>
    )
}
export default Welcome;