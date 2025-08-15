import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  stockData?: {
    symbol: string;
    price?: number;
    change?: number;
    changePercent?: number;
  };
}

const SEOHead = ({ 
  title, 
  description, 
  keywords = "stock market, stock prices, financial data, trading, investment", 
  canonicalUrl,
  ogImage = "",
  stockData 
}: SEOHeadProps) => {
  useEffect(() => {
    
    document.title = title;

   
    const updateOrCreateMeta = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };


    updateOrCreateMeta('description', description);
    updateOrCreateMeta('keywords', keywords);
    
   
    updateOrCreateMeta('og:title', title, true);
    updateOrCreateMeta('og:description', description, true);
    updateOrCreateMeta('og:type', 'website', true);
    updateOrCreateMeta('og:image', ogImage, true);
    
    
    updateOrCreateMeta('twitter:card', 'summary_large_image');
    updateOrCreateMeta('twitter:title', title);
    updateOrCreateMeta('twitter:description', description);
    updateOrCreateMeta('twitter:image', ogImage);
    
    
    if (stockData) {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Corporation",
        "name": stockData.symbol,
        "tickerSymbol": stockData.symbol,
        ...(stockData.price && {
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Stock Price",
            "itemListElement": [
              {
                "@type": "Offer",
                "price": stockData.price,
                "priceCurrency": "INR"
              }
            ]
          }
        })
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
    


    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }
    
    

    let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      document.head.appendChild(viewport);
    }
    
  }, [title, description, keywords, canonicalUrl, ogImage, stockData]);

  return null; 
};

export default SEOHead;