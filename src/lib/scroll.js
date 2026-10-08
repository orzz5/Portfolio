let lenisInstance = null;

export function setLenis(lenis) {
  lenisInstance = lenis;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollToTop(immediate = false) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
  }
}

export function scrollToElement(el, offset = -64) {
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export function scrollToHash(hash, offset = -64) {
  const id = hash.replace('#', '');
  if (!id) return;
  let tries = 0;
  const attempt = () => {
    const el = document.getElementById(id);
    if (el) {
      scrollToElement(el, offset);
      return;
    }
    if (tries++ < 90) requestAnimationFrame(attempt);
  };
  attempt();
}
