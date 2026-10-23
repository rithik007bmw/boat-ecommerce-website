import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Order, ShippingAddress, PaymentMethod } from '../types/order';
import { CartItem } from '../types/cart';
import { generateOrderId, getEstimatedDeliveryDate } from '../utils/formatters';

interface CreateOrderParams {
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  total: number;
  totalSavings: number;
  couponCode?: string;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (params: CreateOrderParams) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  userProfile: {
    name: string;
    email: string;
    phone: string;
    defaultAddress: ShippingAddress;
  };
}

const ORDERS_STORAGE_KEY = 'boat_demo_orders_v1';

const DEFAULT_PROFILE = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  phone: '9876543210',
  defaultAddress: {
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '9876543210',
    addressLine: '402, Lotus Residency, 12th Main, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560038',
  },
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed saving orders to localStorage', e);
    }
  }, [orders]);

  const createOrder = useCallback((params: CreateOrderParams): Order => {
    const newOrder: Order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      estimatedDeliveryDate: getEstimatedDeliveryDate(3),
      items: params.items,
      subtotal: params.subtotal,
      discountAmount: params.discountAmount,
      deliveryFee: params.deliveryFee,
      total: params.total,
      totalSavings: params.totalSavings,
      couponCode: params.couponCode,
      shippingAddress: params.shippingAddress,
      paymentMethod: params.paymentMethod,
      paymentStatus: 'paid',
      orderStatus: 'Confirmed',
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const getOrderById = useCallback(
    (orderId: string) => {
      return orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
    },
    [orders]
  );

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        userProfile: DEFAULT_PROFILE,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
