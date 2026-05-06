import { type FC, useLayoutEffect, useRef, useState } from 'react';
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type CellContext,
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as ExcelJS from 'exceljs';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import z from 'zod';

import { cn } from '@/shared/lib/cn';
import { selectFile } from '@/shared/lib/file';
import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';

import { useUpdateProductPrices } from '../model/use-update-product-prices';

const UpdateProductPriceSchema = z.object({
  code: z.string().min(1, 'Код товара обязателен'),
  name: z.string(),
  price: z
    .number()
    .min(0.01, 'Цена должна быть больше 0')
    .max(999999, 'Цена слишком большая'),
});

const UpdateProductPricesSchema = z.object({
  products: z
    .array(UpdateProductPriceSchema)
    .min(1, 'Загрузите хотя бы один товар'),
});

type UpdateProductPricesSchema = z.infer<typeof UpdateProductPricesSchema>;
type ProductData = z.infer<typeof UpdateProductPricesSchema>['products'][0];

const PriceInputCell = ({ row }: CellContext<ProductData, unknown>) => {
  const { control } = useFormContext<UpdateProductPricesSchema>();

  return (
    <Controller
      control={control}
      name={`products.${row.index}.price`}
      render={({ field }) => (
        <Input
          {...field}
          type="number"
          className="h-8 w-[190px]"
          value={field.value ?? ''}
          onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
        />
      )}
    />
  );
};

const DeleteRowCell = ({ row, table }: CellContext<ProductData, unknown>) => {
  const meta = table.options.meta as {
    removeRow?: (index: number) => void;
  };

  const handleRemove = () => {
    meta.removeRow?.(row.index);
  };

  return (
    <div className="flex justify-end">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleRemove}
        type="button"
        className="hover:text-destructive"
      >
        <Trash2Icon className="h-4 w-4" />
      </Button>
    </div>
  );
};

const columns: ColumnDef<ProductData>[] = [
  {
    accessorKey: 'code',
    header: 'Код',
  },
  {
    accessorKey: 'name',
    header: 'Название',
  },
  {
    accessorKey: 'price',
    header: 'Цена',
    cell: PriceInputCell,
  },
  {
    id: 'actions',
    cell: DeleteRowCell,
  },
];

export const UpdateProductPricesFromExcel: FC = () => {
  const navigate = useNavigate();
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const bottomControlsRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState('auto');

  const { mutate: updatePrices } = useUpdateProductPrices();

  const form = useForm<UpdateProductPricesSchema>({
    resolver: zodResolver(UpdateProductPricesSchema),
    defaultValues: {
      products: [],
    },
  });

  const { fields: products, remove } = useFieldArray({
    control: form.control,
    name: 'products',
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      if (tableContainerRef.current && bottomControlsRef.current) {
        const tableContainerTop =
          tableContainerRef.current.getBoundingClientRect().top;
        const bottomControlsHeight =
          bottomControlsRef.current.getBoundingClientRect().height;
        const newHeight =
          window.innerHeight - tableContainerTop - bottomControlsHeight - 16;

        setTableHeight(`${newHeight}px`);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      removeRow: (index: number) => {
        remove(index);
      },
    },
  });

  const handleFileChange = async () => {
    const file = await selectFile('.xlsx, .xls');
    if (!file) {
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const buffer = await file.arrayBuffer();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.worksheets[0];
    const parsedProducts: ProductData[] = [];

    worksheet.eachRow((row) => {
      const code = row.getCell(1).value;
      const name = row.getCell(3).value;
      const price = row.getCell(5).value;

      if (code && name && price && typeof price === 'number') {
        parsedProducts.push({
          code: String(code),
          name: String(name),
          price: price,
        });
      }
    });

    form.setValue('products', parsedProducts);
  };

  const onSubmit = (data: UpdateProductPricesSchema) => {
    updatePrices(data.products, {
      onSuccess: () => {
        toast.success('Цены обновлены');
        navigate(ROUTES.products.base);
      },
      onError: () => toast.error('Ошибка обновления цен'),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-4 pb-4 items-end">
          <div>
            <Button onClick={handleFileChange} type="button">
              Выбрать excel файл
            </Button>
          </div>
        </div>

        <div
          ref={tableContainerRef}
          className="overflow-hidden border rounded-md"
          style={{ height: tableHeight }}
        >
          <Table
            containerClassName="overflow-auto h-full table-scrollbar"
            className={cn({
              'h-full': !products.length,
            })}
          >
            <TableHeader className="sticky top-0 bg-secondary z-50 shadow-xl">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="overflow-y-auto">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="h-full">
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Загрузите файл для отображения данных.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div
          ref={bottomControlsRef}
          className="flex items-center justify-end space-x-2 py-4"
        >
          <Button
            type="submit"
            disabled={products.length === 0 || !form.formState.isDirty}
          >
            Обновить цены
          </Button>
        </div>
      </form>
    </Form>
  );
};
