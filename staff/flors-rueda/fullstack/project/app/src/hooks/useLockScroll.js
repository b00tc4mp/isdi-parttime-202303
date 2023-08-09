import { useCallback } from 'react';

const useLockScroll = () => {
  const lockScroll = useCallback(
    () => {
      document.body.dataset.scrollLock = 'true';
      document.body.style.overflow = 'hidden';

    }, [])

  const unlockScroll = useCallback(
    () => {
      document.body.style.overflow = 'auto';
      document.body.dataset.scrollLock = 'false';
    }, []);

  return {
    lockScroll,
    unlockScroll
  };
}

export default useLockScroll