import React, { useRef, useEffect, FC } from 'react';
import { gsap } from 'gsap';
import "./child.css"

export const Child: FC<any> = ({angle}) => {
  // const childRef = useRef(null);

  // const startRotation = () => {
  //   const radius = 200; // Adjust the desired radius

  //   gsap.to(childRef.current, {
  //     duration: 10, // Adjust the rotation duration
  //     rotation: '+=360',
  //     transformOrigin: `50% ${radius}px`,
  //   });
  // };

  // const handleClick = () => {
  //   // Start rotation when the child is clicked
  //   startRotation();
  // };

  return (
    <div
      // ref={childRef}
      className="child"
      // onClick={handleClick}
      style={{
        transform: `rotate(${angle}deg)`, // Set initial rotation angle
      }}
    />
  );
}