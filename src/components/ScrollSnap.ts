export function initScrollSnap(wrapper: HTMLElement | null) {
  if (!wrapper) return

  const container = wrapper.querySelector<HTMLElement>(".scroll-snap-container") as HTMLElement
  const arrows = wrapper.querySelectorAll<HTMLButtonElement>(".scroll-arrow")

  if (!container) return

  function updateScrollState(): void {
    const canScrollLeft = container.scrollLeft > 0
    const canScrollRight = 
      Math.ceil(container.scrollLeft) < container.scrollWidth - container.clientWidth
    
    if (!wrapper) return

    wrapper
      .querySelector<HTMLButtonElement>(".scroll-arrow--left")
      ?.classList.toggle("hidden", !canScrollLeft)
    wrapper
      .querySelector<HTMLButtonElement>(".scroll-arrow--right")
      ?.classList.toggle("hidden", !canScrollRight)
  }

  function scrollTo(direction: "left" | "right"): void {
    const firstChild = container.children[0] as HTMLElement | undefined
    if (!firstChild) return

    const itemWidth = firstChild.offsetWidth
    const gap = parseInt(getComputedStyle(container).gap) || 0
    const scrollAmount = itemWidth + gap

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  function handleWheel(e: WheelEvent): void {
    e.preventDefault()
    container.scrollBy({ left: e.deltaY, behavior: "smooth" })
  }

  arrows.forEach((btn) => {
    btn.addEventListener("click", () =>
      scrollTo(btn.dataset.arrow as "left" | "right")
    )
  })

  container.removeEventListener("scroll", updateScrollState);
  container.removeEventListener("wheel", handleWheel);

  updateScrollState()

  return () => {
    container.removeEventListener("scroll", updateScrollState);
    container.removeEventListener("wheel", handleWheel);
    arrows.forEach(btn => {
      btn.removeEventListener("click", () => scrollTo(btn.dataset.arrow as "left" | "right"));
    });
  };
}
