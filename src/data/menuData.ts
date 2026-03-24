export interface MenuItem {
    name: string;
    price: string;
    veg: boolean;
    category: string;
    type?: string;
    trend?: string;
    trendColor?: string;
    active?: boolean;
}

export const menuItems: MenuItem[] = [
    { name: 'Dal Makhani', price: '₹280', veg: true, category: 'Main Course', type: 'Veg · Main', trend: '↑ 18% this week', trendColor: 'var(--sg)', active: false },
    { name: 'Butter Chicken', price: '₹320', veg: false, category: 'Main Course', type: 'Non-Veg · Main', trend: '↑ 11% this week', trendColor: 'var(--sg)', active: true },
    { name: 'Paneer Tikka', price: '₹260', veg: true, category: 'Starters', type: 'Veg · Starter', trend: '↑ 4% this week', trendColor: 'var(--sg)', active: false },
    { name: 'Garlic Naan', price: '₹60', veg: true, category: 'Breads', type: 'Veg · Bread', active: false },
    { name: 'Mango Lassi', price: '₹120', veg: true, category: 'Beverages', type: 'Veg · Beverage', active: false },
    { name: 'Chicken Biryani', price: '₹380', veg: false, category: 'Biryani', type: 'Non-Veg · Biryani', active: false },
    { name: 'Palak Paneer', price: '₹250', veg: true, category: 'Main Course', type: 'Veg · Main', trend: '↓ 3% this week', trendColor: 'var(--tc)', active: false },
    { name: 'Chole Bhature', price: '₹180', veg: true, category: 'Main Course', active: false },
    { name: 'Rajma Chawal', price: '₹200', veg: true, category: 'Main Course', active: false },
    { name: 'Aloo Paratha', price: '₹90', veg: true, category: 'Breads', active: false },
    { name: 'Paneer Butter Masala', price: '₹290', veg: true, category: 'Main Course', active: false },
    { name: 'Veg Biryani', price: '₹260', veg: true, category: 'Biryani', active: false },
    { name: 'Jeera Rice', price: '₹150', veg: true, category: 'Main Course', active: false },
    { name: 'Tandoori Roti', price: '₹40', veg: true, category: 'Breads', active: false },
    { name: 'Lachha Paratha', price: '₹70', veg: true, category: 'Breads', active: false },
    { name: 'Chicken Curry', price: '₹300', veg: false, category: 'Main Course', active: false },
    { name: 'Mutton Rogan Josh', price: '₹420', veg: false, category: 'Main Course', active: true },
    { name: 'Fish Curry', price: '₹350', veg: false, category: 'Main Course', active: true },
    { name: 'Egg Curry', price: '₹220', veg: false, category: 'Main Course', active: true },
    { name: 'Chicken Tikka', price: '₹340', veg: false, category: 'Starters', active: true },
    { name: 'Veg Manchurian', price: '₹220', veg: true, category: 'Starters', active: true },
    { name: 'Hakka Noodles', price: '₹180', veg: true, category: 'Main Course', active: true },
    { name: 'Schezwan Noodles', price: '₹200', veg: true, category: 'Main Course', active: true },
    { name: 'Veg Fried Rice', price: '₹170', veg: true, category: 'Main Course', active: true },
    { name: 'Paneer Chilli', price: '₹260', veg: true, category: 'Starters', active: true },
    { name: 'Chicken Fried Rice', price: '₹220', veg: false, category: 'Main Course', active: true },
    { name: 'Chicken Noodles', price: '₹240', veg: false, category: 'Main Course', active: true },
    { name: 'Chilli Chicken', price: '₹300', veg: false, category: 'Starters', active: true },
    { name: 'Masala Dosa', price: '₹120', veg: true, category: 'Main Course', active: true },
    { name: 'Plain Dosa', price: '₹90', veg: true, category: 'Main Course', active: true },
    { name: 'Idli Sambar', price: '₹80', veg: true, category: 'Main Course', active: true },
    { name: 'Medu Vada', price: '₹100', veg: true, category: 'Main Course', active: true },
    { name: 'Upma', price: '₹110', veg: true, category: 'Main Course', active: true },
    { name: 'Pav Bhaji', price: '₹150', veg: true, category: 'Main Course', active: true },
    { name: 'Vada Pav', price: '₹50', veg: true, category: 'Starters', active: true },
    { name: 'Samosa', price: '₹30', veg: true, category: 'Starters', active: true },
    { name: 'Kachori', price: '₹40', veg: true, category: 'Starters', active: true },
    { name: 'French Fries', price: '₹120', veg: true, category: 'Starters', active: true },
    { name: 'Veg Burger', price: '₹150', veg: true, category: 'Main Course', active: true },
    { name: 'Chicken Burger', price: '₹180', veg: false, category: 'Main Course', active: true },
    { name: 'Veg Pizza', price: '₹300', veg: true, category: 'Main Course', active: true },
    { name: 'Chicken Pizza', price: '₹380', veg: false, category: 'Main Course', active: true },
    { name: 'Chocolate Shake', price: '₹140', veg: true, category: 'Beverages', active: true },
    { name: 'Cold Coffee', price: '₹130', veg: true, category: 'Beverages', active: true },
    { name: 'Sweet Lassi', price: '₹100', veg: true, category: 'Beverages', active: true },
    { name: 'Buttermilk', price: '₹60', veg: true, category: 'Beverages', active: true },
    { name: 'Gulab Jamun', price: '₹90', veg: true, category: 'Desserts', active: true },
    { name: 'Rasgulla', price: '₹80', veg: true, category: 'Desserts', active: true },
    { name: 'Ice Cream Sundae', price: '₹150', veg: true, category: 'Desserts', active: true },
    { name: 'Kheer', price: '₹110', veg: true, category: 'Desserts', active: true }
];
