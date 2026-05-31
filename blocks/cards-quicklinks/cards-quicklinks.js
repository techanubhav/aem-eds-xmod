import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      // Check for picture OR img (icons may be bare img not wrapped in picture)
      const hasPicture = div.querySelector('picture');
      const hasImg = div.querySelector('img');
      if (div.children.length === 1 && (hasPicture || hasImg)) {
        div.className = 'cards-quicklinks-card-image';
      } else {
        div.className = 'cards-quicklinks-card-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
