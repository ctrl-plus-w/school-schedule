import { useEffect } from 'react';
// import { useSelector } from 'react-redux';

import { gsap, Expo } from 'gsap/all';

export const animateOut = async () => {
  await gsap.to('.event', {
    duration: 0.2,
    scale: 1,
    opacity: 0,
    ease: Expo.ease,
  });
};

export const animateIn = async () => {
  await gsap.to('.event', {
    duration: 0.6,
    scale: 1,
    opacity: 1,
    ease: Expo.ease,
  });
};

const useAnimation = (events = []) => {
  useEffect(() => {
    animateIn();
  }, [events]);

  return { animateIn, animateOut };
};

export default useAnimation;
