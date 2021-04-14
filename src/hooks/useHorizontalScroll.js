import { useEffect, createRef } from 'react';

const useHorizontalScroll = () => {
  const container = createRef();
  const slider = createRef();

  useEffect(() => {
    if (!container || !container.current || !slider || !slider.current) return;

    const sliderWidth = slider.current.getBoundingClientRect().width;
    const containerWidth = container.current.getBoundingClientRect().width;

    const bodyHeight = sliderWidth - (containerWidth - window.innerHeight);
    document.body.style.height = `${bodyHeight}px`;

    let current = 0;
    let target = 0;
    let ease = 0.3;

    const lerp = (start, end, t) => {
      return start * (1 - t) + end * t;
    };

    const animate = () => {
      current = parseFloat(lerp(current, target, ease)).toFixed(0);
      target = window.scrollY;

      if (container.current) container.current.style.transform = `translateX(-${current}px)`;
      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animation);
      document.body.style.height = '';
    };
  }, [container, slider]);

  return { container, slider };
};

export default useHorizontalScroll;
