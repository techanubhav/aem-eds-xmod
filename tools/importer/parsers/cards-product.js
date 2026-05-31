/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-product variant.
 * Base block: cards
 * Source: https://www.racv.com.au/
 * Selector: .highlightcards.parent .cmp-highlight-cards
 * Generated: 2026-05-31
 *
 * Source structure: .cmp-highlight-cards contains a .main-section (h2 title + p description)
 * followed by a .swiper with .cmp-productActionCard cards. Each card has an image section
 * (.cmp-productActionCard_imgSection) and content section (.cmp-productActionCard_contentSection)
 * with h3 title, paragraph description, and CTA button.
 *
 * Target structure (Cards block): Each row has two cells:
 *   Cell 1: image (picture element)
 *   Cell 2: content (bold title paragraph + description paragraph + optional CTA link)
 */
export default function parse(element, { document }) {
  // Find all product action cards within the swiper or directly in the element
  const cards = element.querySelectorAll('.cmp-productActionCard, .cmp-tile');
  const uniqueCards = element.querySelectorAll('.cmp-productActionCard');

  const cells = [];

  // If no cards found with primary selector, try alternative selectors
  const cardElements = uniqueCards.length > 0
    ? uniqueCards
    : element.querySelectorAll('.swiper-slide');

  cardElements.forEach((card) => {
    // Extract image from the card
    const imgSection = card.querySelector('.cmp-productActionCard_imgSection, .cmp-tile picture, picture');
    const picture = imgSection ? imgSection.querySelector('picture') || imgSection.closest('picture') || imgSection : null;
    const img = card.querySelector('img');

    // Extract title from the card content section
    const titleEl = card.querySelector('.cmp-productActionCard_contentSection h3, .cmp-productActionCard_contentSection .cmp-title__text, h3.cmp-title__text, h3');

    // Extract description text
    const descriptionEl = card.querySelector('.cmp-productActionCard_contentSection .cmp-text p, .cmp-productActionCard_contentSection .text p, .text p');

    // Extract CTA link
    const ctaLink = card.querySelector('.cta-btn a.cmp-button, .cta-btn a, a.cmp-button, a.cmp-button--primary');

    // Build image cell - use picture element if available, otherwise img
    const imageCell = [];
    if (picture && picture.tagName === 'PICTURE') {
      imageCell.push(picture);
    } else if (img) {
      // Wrap img in a picture-like structure if only img is available
      imageCell.push(img);
    }

    // Build content cell matching Cards block format:
    // <p><strong>title</strong></p> + <p>description</p> + optional link
    const contentCell = [];

    if (titleEl) {
      // Create bold title paragraph matching library example format
      const titleP = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      titleP.appendChild(strong);
      contentCell.push(titleP);
    }

    if (descriptionEl) {
      // Create description paragraph
      const descP = document.createElement('p');
      descP.textContent = descriptionEl.textContent.trim();
      contentCell.push(descP);
    }

    if (ctaLink) {
      // Preserve the CTA link with its text and href
      const link = document.createElement('a');
      link.href = ctaLink.href || ctaLink.getAttribute('href');
      const buttonText = ctaLink.querySelector('.cmp-button__text, span');
      link.textContent = buttonText ? buttonText.textContent.trim() : ctaLink.textContent.trim();
      const ctaP = document.createElement('p');
      ctaP.appendChild(link);
      contentCell.push(ctaP);
    }

    // Only add row if we have meaningful content
    if (imageCell.length > 0 || contentCell.length > 0) {
      cells.push([imageCell, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-product', cells });
  element.replaceWith(block);
}
