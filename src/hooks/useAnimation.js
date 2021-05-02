/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { gsap, Expo } from 'gsap/all';

const useAnimation = (events) => {
  const elements = [];

  const database = useSelector((state) => state.database);
  const databaseSlices = Object.values(database);
  const loadingArray = databaseSlices.map((slice) => slice.loading);
  const loading = loadingArray.reduce((acc, curr) => acc && curr, false);

  const pushElement = (element) => {
    elements.push(element);
  };

  useEffect(() => {
    if (!loading) {
      gsap.to(elements, {
        duration: 0.6,
        transform: 'scale(1)',
        opacity: 1,
        ease: Expo.ease,
      });
    } else {
      gsap.to(elements, {
        duration: 0.4,
        transform: 'scale(0.8)',
        opacity: 0,
        ease: Expo.ease,
      });
    }
  }, [events]);

  return { pushElement };
};

export default useAnimation;
