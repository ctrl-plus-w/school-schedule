/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { gsap, Expo } from 'gsap/all';

const useAnimation = (events = []) => {
  useEffect(() => events.length && animateIn(), [events]);

  const animateIn = () => {
    gsap.to('.event', {
      duration: 0.6,
      transform: 'scale(1)',
      opacity: 1,
      ease: Expo.ease,
    });
  };

  const animateOut = () => {
    gsap.to('.event', {
      duration: 0.2,
      transform: 'scale(0.9)',
      opacity: 0,
      ease: Expo.ease,
    });
  };

  return { animateIn, animateOut };
};

export default useAnimation;
