import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/cn';

type Tag = 'p' | 'h1' | 'h2' | 'h3' | 'h4';

type TypographyProps = {
  tag?: Tag;
};

export const typographyVariants = cva('', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      destructive: 'text-destructive',
      secondary: 'text-secondary',
    },
    size: {
      sm: 'text-sm leading-8 max-lg:leading-7 max-sm:leading-6',
      base: 'text-base leading-8 max-lg:leading-7 max-sm:leading-6',
      lg: 'text-lg leading-8 max-lg:leading-7 max-sm:leading-6',
      xl: 'text-xl max-sm:text-lg leading-8 max-lg:leading-7 max-sm:leading-6',
      '2xl':
        'text-2xl max-lg:text-xl max-sm:text-lg leading-8 max-lg:leading-7',
      '3xl':
        'text-3xl max-md:text-2xl max-sm:text-xl leading-8 max-lg:leading-7',
      '4xl': 'text-4xl max-lg:text-3xl leading-8 max-lg:leading-7',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'base',
    weight: 'normal',
    align: 'left',
  },
});

export function Typography<T extends Tag>({
  tag = 'p',
  size,
  weight,
  align,
  variant,
  children,
  className,
  ...props
}: TypographyProps &
  React.ComponentProps<T> &
  VariantProps<typeof typographyVariants>) {
  const Comp = tag;

  return (
    <Comp
      className={cn(
        typographyVariants({ variant, size, weight, align, className }),
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
