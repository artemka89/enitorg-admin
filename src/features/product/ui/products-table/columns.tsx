'use client';

import { type FocusEvent, useEffect, useRef, useState } from 'react';
import { href, Link } from 'react-router';
import { type CellContext, type ColumnDef } from '@tanstack/react-table';
import { CheckIcon, EditIcon, Loader2 } from 'lucide-react';

import { formatDate } from '@/shared/lib/format-date';
import { formatPrice } from '@/shared/lib/format-price';
import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { type Product } from '../../model/types';

export function EditableTableCell<TData, TValue>({
  row,
  table,
}: CellContext<TData, TValue>) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const product = row.original as Product;
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (containerRef.current?.contains(event.relatedTarget as Element)) {
      return;
    }

    if (inputRef.current) {
      inputRef.current.value = product.price.toString();
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    const newValue = inputRef.current?.value;
    const numericValue = Number(newValue);

    if (numericValue === product.price) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);

    const meta = table.options.meta as {
      updateData?: (id: string, value: number) => Promise<void>;
    };

    try {
      await meta?.updateData?.(product.id, numericValue);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div
      ref={containerRef}
      className="w-[190px] flex gap-1 items-center justify-between min-h-[32px]"
    >
      {isEditing ? (
        <>
          <Input
            ref={inputRef}
            defaultValue={product.price}
            disabled={isSaving}
            onBlur={handleBlur}
            className="flex-1 h-8"
          />
          <Button size="icon-sm" onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? <Loader2 className="animate-spin" /> : <CheckIcon />}
          </Button>
        </>
      ) : (
        <>
          <div className="flex-1 truncate">{formatPrice(product.price)}</div>
          <Button variant="outline" size="icon-sm" onClick={handleEdit}>
            <EditIcon />
          </Button>
        </>
      )}
    </div>
  );
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'updatedAt',
    header: 'Обновлено',
    cell: ({ row }) => formatDate(row.getValue('updatedAt')),
  },
  {
    accessorKey: 'image',
    header: 'Изобр.',
    cell: ({ row }) => {
      return (
        <div className="relative size-16 overflow-hidden rounded-xl">
          <img
            src={row.original.imageUrl}
            alt={row.original.name}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'code',
    header: 'Код',
  },
  {
    accessorKey: 'name',
    header: 'Название',
    cell: ({ row }) => (
      <Link
        to={href(ROUTES.products.byId, { id: row.original.id })}
        className="w-full font-semibold text-wrap hover:underline"
      >
        {row.getValue('name')}
      </Link>
    ),
  },
  {
    accessorKey: 'categories',
    header: 'Категории',
    cell: ({ row }) => {
      return (
        <ul>
          {row.original.categories.map((category) => (
            <li key={category.id}>
              <Link
                to={href(ROUTES.categories.byId, { id: category.id })}
                className="font-semibold text-wrap hover:underline"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'Цена',
    cell: EditableTableCell,
  },
];
