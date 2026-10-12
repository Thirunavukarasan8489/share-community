export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  category?: string;
}

// Real images can be dropped into /public/gallery/ and listed below with captions.
// As instructed in AGENTS.md §3.6 & §9:
// Zero stock photos are included by default to preserve absolute truthfulness.
// When empty, a tasteful "Photographs coming soon" empty state is displayed.
export const galleryItems: GalleryItem[] = [];
