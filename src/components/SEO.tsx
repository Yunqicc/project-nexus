import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title = 'Project Nexus | Yunqi Showcase', 
  description = 'A modern portfolio showcasing AI projects, creative coding, and technical experiments. Built with React, Tailwind, and Supabase.',
  keywords = 'portfolio, react, typescript, ai, creative coding, showcase',
  image = '/og-image.png',
  url = 'https://yunqicc.github.io/project-nexus/'
}: SEOProps) => {
  const siteTitle = title === 'Project Nexus | Yunqi Showcase' ? title : `${title} | Project Nexus`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
