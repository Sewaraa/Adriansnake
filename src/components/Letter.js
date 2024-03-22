import React from "react"
const Letter=({dot})=>{
  
   
    const style={
    left:`${dot[0]}%`,
    top:`${dot[1]}`,
   }
   return <div className="letter" style={style}>o</div>

   
  
}
export default Letter;