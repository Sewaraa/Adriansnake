import React from "react";
const Snake=(props)=>{
    return(
     
       <div >
 {props.snakDots.map((dot,i)=>{
   const style={
    left:`${dot[0]}%`,
    up:`${dot[1]}`,
   }
   return <div className="snake-segment" key={i} style={style}></div>
      })}
     </div>
    );
}
export default Snake;