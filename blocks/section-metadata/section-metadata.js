/**
 * @param {Element} block The section-metadata block element
 */
export default function decorate(block) {
  const section = block.closest('.section');
  if (!section) return;

  const props = [...block.children].reduce((acc, row) => {
    if (row.children.length >= 2) {
      const key = row.children[0].textContent.trim().toLowerCase();
      const value = row.children[1].textContent.trim().toLowerCase();
      acc[key] = value;
    }
    return acc;
  }, {});

  if (props.style) {
    section.classList.add(props.style);
  }

  block.remove();
}
