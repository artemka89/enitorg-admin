export type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  number: string;
  status: OrderStatus;
  items: OrderItem[];
  customerEmail: string | null;
  customerName: string | null;
  customerPhone: string | null;
  customerComment: string | null;
  totalPrice: number;
  totalWeight: number;
  totalItems: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  code: string;
  imageUrl: string;
  price: number;
  quantity: number;
  weight: number;
}

export type OrderStatuses = {
  value: OrderStatus;
  label: string;
};
