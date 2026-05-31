/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-article
 * Base block: cards
 * Source: https://www.racv.com.au/
 * Selector: .relatedinformation.parent .cmp-related-information
 * Generated: 2026-05-31
 *
 * Extracts article cards from the RACV related information component.
 * Each card has: image, category label (optional), title, description, and link.
 * Maps to standard Cards block with image in col1, title+description in col2.
 */
export default function parse(element, { document }) {
  // Find all article card items
  const cards = element.querySelectorAll('.cmp-related-information__card, li.col');
  const cells = [];

  cards.forEach((card) => {
    // Extract the link wrapping the card (used to make the card clickable)
    const link = card.querySelector('a.cmp-single-link-tile, a[href]');

    // Extract the image from the image section
    const picture = card.querySelector('.cmp-articleCard_imgSection picture, .cmp-articleCard picture, picture');
    const img = card.querySelector('.cmp-articleCard_imgSection img, img');

    // Extract the title heading
    const heading = card.querySelector('.cmp-articleCard_contentSection h4, .cmp-articleCard_contentSection h3, .cmp-title__text, h4, h3');

    // Extract the description text
    const description = card.querySelector('.cmp-articleCard_contentSection .cmp-text p, .cmp-text p, .text p');

    // Build the image cell (col 1)
    const imageCell = [];
    if (picture) {
      imageCell.push(picture);
    } else if (img) {
      imageCell.push(img);
    }

    // Build the content cell (col 2)
    // Cards block expects: bold title + description paragraph
    const contentCell = [];

    if (heading) {
      // Create a paragraph with strong text for the title, matching library example format
      const titleP = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = heading.textContent.trim();
      titleP.appendChild(strong);

      // If there's a link, wrap the title in a link
      if (link && link.getAttribute('href')) {
        const anchor = document.createElement('a');
        anchor.setAttribute('href', link.getAttribute('href'));
        anchor.appendChild(strong);
        titleP.innerHTML = '';
        titleP.appendChild(anchor);
      }
      contentCell.push(titleP);
    }

    if (description) {
      const descP = document.createElement('p');
      descP.textContent = description.textContent.trim();
      contentCell.push(descP);
    }

    // Only add the row if we have meaningful content
    if (imageCell.length > 0 || contentCell.length > 0) {
      cells.push([imageCell, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
