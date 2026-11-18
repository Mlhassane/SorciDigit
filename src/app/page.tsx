import Features from '@/components/home/features';
import Hero from '@/components/home/hero';
import Gallery from '@/components/home/gallery';
import Testimonials from '@/components/home/testimonials';
import Activities from '@/components/home/activities';
import { getActivities, getGalleryItems, getTestimonials } from '@/lib/cms-server';

export const revalidate = 300;

export default async function Homepage() {
  const [testimonials, gallery, activities] = await Promise.all([
    getTestimonials(),
    getGalleryItems(),
    getActivities(),
  ]);

  const testimonialItems = testimonials.map((t) => ({
    text: t.text,
    imageSrc: t.avatar_url || '/assets/avatars/avatar-1.webp',
    name: t.name,
    username: t.username || '',
  }));

  const galleryImages = gallery
    .filter((g) => g.image_url)
    .map((g) => ({ src: g.image_url, alt: g.alt || g.title }));

  return (
    <>
      <Hero />
      <Features />
      <Testimonials items={testimonialItems} />
      <Activities items={activities} />
      <Gallery images={galleryImages} />
    </>
  );
}
