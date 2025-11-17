export type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';

export interface OrderTableItem {
  id: string;
  number: string;
  status: OrderStatus;
  customerName: string | null;
  customerPhone: string | null;
  totalPrice: number;
  createdAt: string;
}

export interface Order {
  id: string;
  number: string;
  status: OrderStatus;
  items: OrderItem[];
  customerEmail: string | null;
  customerName: string | null;
  customerPhone: string;
  customerComment: string | null;
  totalPrice: number;
  totalWeight: number;
  totalItems: number;
  createdAt: string;
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

export type OrderStatusItem = {
  value: OrderStatus;
  label: string;
  color: string;
  disabled: boolean;
};
