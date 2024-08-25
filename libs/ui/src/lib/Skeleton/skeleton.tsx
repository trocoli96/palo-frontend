import React from 'react';

import { cn } from 'utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-secondary-100', className)} {...props} />;
}

export { Skeleton };
