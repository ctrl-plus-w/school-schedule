import { useEffect, createRef } from 'react';

const useVerticalScroll = () => {
  const container = createRef();
  const slider = createRef();

  useEffect(() => {
    if (!container || !container.current || !slider || !slider.current) return;

    const sliderHeight = slider.current.getBoundingClientRect().height;
    const containerHeight = container.current.getBoundingClientRect().height;

    const bodyHeight = sliderHeight - (containerHeight - window.innerHeight);
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

      if (container.current) container.current.style.transform = `translateY(-${current}px)`;
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

export default useVerticalScroll;
