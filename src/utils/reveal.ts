// Adds `.reveal` to every `.scroll-reveal` element inside `scope` as it enters the viewport.
// `perRow` resets the stagger delay so each row animates as a wave.
export function initScrollReveal(scope: string, perRow = 3, stagger = 100) {
  const items = document.querySelectorAll(`${scope} .scroll-reveal:not(.reveal)`);
  const indexMap = new Map<Element, number>();
  items.forEach((item, i) => indexMap.set(item, i));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = indexMap.get(entry.target) ?? 0;
        setTimeout(() => {
          entry.target.classList.add('reveal');
        }, (index % perRow) * stagger);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -10px 0px'
  });

  items.forEach((item) => observer.observe(item));
}
