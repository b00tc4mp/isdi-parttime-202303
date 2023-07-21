import { useCallback } from 'react';

const useLockScroll = () => {
  const lockScroll = useCallback(
    () => {
      document.body.dataset.scrollLock = 'true';
      document.body.style.overflow = 'hidden';

    }, [])

  const unlockScroll = useCallback(
    () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }, []);

  return {
    lockScroll,
    unlockScroll
  };
}

export default useLockScroll