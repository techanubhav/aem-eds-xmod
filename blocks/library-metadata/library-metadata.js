/**
 * @param {Element} block The library-metadata block element
 */
export default function decorate(block) {
  block.closest('.section').classList.add('library-metadata-section');
}
