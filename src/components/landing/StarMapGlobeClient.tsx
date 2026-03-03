'use client';

import dynamic from 'next/dynamic';

const StarMapGlobe = dynamic(() => import('./StarMapGlobe'), { ssr: false });

export default function StarMapGlobeClient() {
    return <StarMapGlobe />;
}
