import React from 'react';

const JsonLd = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Agency',
        name: 'Sorci Digit',
        url: 'https://sorcidigit.com',
        logo: 'https://sorcidigit.com/1.png',
        sameAs: [
            'https://twitter.com/sorci_digit',
            'https://instagram.com/sorci_digit',
            'https://www.linkedin.com/company/sorci-digit',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+22777042181',
            contactType: 'customer service',
            areaServed: ['NE', 'FR', 'US', 'World'],
            availableLanguage: ['French', 'English'],
        },
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'Niger',
            addressRegion: 'Niamey',
        },
        description: "Agence de marketing digital et de développement web experte en transformation numérique.",
        priceRange: "$$"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

export default JsonLd;
