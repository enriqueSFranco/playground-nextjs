import { useCallback, useLayoutEffect } from "react";

export function useScrollLock() {
  const lockScroll = useCallback(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.overflow = "hidden"
    document.body.dataset.scrollLock = 'true';
    document.body.style.paddingRight = `${scrollBarCompensation}px`
  }, [])
  const unlockScroll = useCallback(() => {
    document.body.style.overflow = ""
    delete document.body.dataset.scrollLock;
    document.body.style.paddingRight = ''
  }, [])

  useLayoutEffect(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.setProperty('--scrollbar-compensation', `${scrollBarCompensation}px`);
  }, [])

  return {lockScroll, unlockScroll}
}
