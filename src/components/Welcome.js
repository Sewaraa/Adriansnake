import React, { useContext } from "react";
import { ModalContext } from "../context/Modalcontext";

const Welcome = () => {
    const { hideModal } = useContext(ModalContext)
    return (
        <div className="modal">
            <div  className="modal_content">
                <h1 > Hello Adrian!</h1>
                <h2>Are you Ready?</h2>
                <button onClick={hideModal}>Ok</button></div>



        </div>
    )
}
export default Welcome;