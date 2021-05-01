import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { gsap, Expo } from 'gsap/all';

const useAnimation = (days) => {
  const elements = [];

  const databaseLoading = ({ events, labels, users, subjects, roles }) =>
    events.loading || labels.loading || users.loading || subjects.loading || roles.loading;

  const loading = useSelector(({ database }) => databaseLoading(database));

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
  }, [days]);

  return elements;
};

export default useAnimation;
