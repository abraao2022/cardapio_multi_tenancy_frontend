import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://vovogussi.com.br/',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0
        },
        {
            url: 'https://vovogussi.com.br/car',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        }
    ];
}
