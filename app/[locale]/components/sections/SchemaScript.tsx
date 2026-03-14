'use client';

import { useEffect } from 'react';

interface SchemaScriptProps {
  schema: Record<string, unknown> | null | undefined;
  id?: string;
}

export default function SchemaScript({ schema, id = 'schema' }: SchemaScriptProps) {
  useEffect(() => {
    if (!schema) return;
    
    // Remove undefined values
    const cleanSchema = JSON.parse(JSON.stringify(schema));
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(cleanSchema);
    script.id = id;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [schema, id]);

  return null;
}

