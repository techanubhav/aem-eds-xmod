/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: RACV site-wide cleanup.
 * Removes non-authorable content from the page DOM before/after block parsing.
 * All selectors verified against captured DOM in migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie/GDPR banner (inside header, but removing explicitly in case structure changes)
    // Found: <div class="gdpr gdpr--show"> inside <header class="header">
    WebImporter.DOMUtils.remove(element, ['.gdpr']);

    // Remove success banner XF render (form submission UI, not authorable)
    // Found: <div class="successbannerxfrender"> containing cmp-successbanner
    WebImporter.DOMUtils.remove(element, ['.successbannerxfrender']);

    // Remove fixed sub-header (empty div, not authorable)
    // Found: <div class="fixedsubhead">
    WebImporter.DOMUtils.remove(element, ['.fixedsubhead']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site chrome
    // Found: <header class="header"> (contains logo, nav, search, GDPR)
    // Found: <footer class="cmp-footer"> (contains footer links, copyright)
    // Found: <div class="breadcrumb"> (empty breadcrumb container)
    WebImporter.DOMUtils.remove(element, [
      'header.header',
      'footer.cmp-footer',
      '.breadcrumb',
    ]);

    // Remove tracking iframes and beacons
    // Found: <iframe title="Adobe ID Syncing iFrame" id="destination_publishing_iframe_racv_0">
    // Found: <iframe src="https://9968524.fls.doubleclick.net/...">
    // Found: <iframe src="https://9885174.fls.doubleclick.net/...">
    // Found: <iframe src="https://9949323.fls.doubleclick.net/...">
    // Found: <iframe id="universal_pixel_2h7xb5r" ...>
    // Found: <div id="batBeacon31395386257"> (Bing tracking pixel)
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      '[id^="batBeacon"]',
      'noscript',
    ]);
  }
}
