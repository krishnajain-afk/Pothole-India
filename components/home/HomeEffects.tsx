'use client';

import { useEffect } from 'react';
import { startHome } from '@/lib/home-behaviour';

/* Starts the homepage behaviour once the server-rendered markup is on the page. Renders nothing. */
export function HomeEffects() {
  useEffect(() => { startHome(); }, []);
  return null;
}
