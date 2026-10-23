export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

export const getEstimatedDeliveryDate = (daysToAdd: number = 3): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const generateOrderId = (): string => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `BOAT-${randomNum}`;
};
