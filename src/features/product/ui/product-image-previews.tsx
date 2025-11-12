import { type FC } from 'react';
import { X } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';

interface ProductImagePreviewsProps {
  imageUrls: string[];
  onImagesChange: (urls: string[]) => void;
  className?: string;
}

export const ProductImagePreviews: FC<ProductImagePreviewsProps> = ({
  imageUrls,
  onImagesChange,
  className,
}) => {
  if (!imageUrls) {
    return null;
  }

  const handleRemoveImage = (url: string) => {
    onImagesChange(imageUrls.filter((prevUrl) => prevUrl !== url));
  };

  return (
    <div className={cn(className, 'grid grid-cols-2 gap-4 md:grid-cols-5')}>
      {imageUrls.map((url) => (
        <Card key={url} className="group relative p-0">
          <CardContent className="p-0">
            <div className="relative aspect-square overflow-hidden rounded-md">
              <img
                src={url}
                alt={url}
                className="h-full w-full object-contain aspect-square rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => handleRemoveImage(url)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
