import { useCallback } from 'react';

/**
 * Custom hook for locking and unlocking the scroll of the document body.
 *
 * @returns {object} An object containing functions to lock and unlock the scroll.
 */
const useLockScroll = () => {
  /**
   * Locks the scroll of the document body.
   */
  const lockScroll = useCallback(
    () => {
      document.body.dataset.scrollLock = 'true';
      document.body.style.overflow = 'hidden';
    }, []
  );

  /**
   * Unlocks the scroll of the document body.
   */
  const unlockScroll = useCallback(
    () => {
      document.body.style.overflow = 'auto';
      document.body.dataset.scrollLock = 'false';
    }, []
  );

  return {
    lockScroll,
    unlockScroll
  };
}

export default useLockScroll;
