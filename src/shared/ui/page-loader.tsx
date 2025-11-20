import { type FC } from 'react';

export const PageLoader: FC = () => {
  return (
    <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4 p-8">
        <div className="relative">
          <div className="border-muted border-t-primary h-16 w-16 animate-spin rounded-full border-4 md:h-20 md:w-20" />
          <div className="border-muted/50 border-b-primary/70 animate-reverse-spin absolute top-2 left-2 h-12 w-12 animate-spin rounded-full border-4 md:h-16 md:w-16" />
          <div className="bg-primary absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full md:h-3 md:w-3" />
        </div>

        <div className="text-center">
          <p className="text-foreground text-sm font-medium md:text-base">
            Загрузка...
          </p>
        </div>
      </div>
    </div>
  );
};
