import axios from 'axios';
import { getProducts } from '../productService';
import { getCategory } from '../categoryService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
 
});

// Productos con bajo stock
export const getLowStockProducts = (threshold: number = 5) =>
  api.get(`/products/low_stock/`);

// Productos más vendidos
export const getTopSoldProducts = (period: 'mes' | 'año' | 'todo' = 'todo') =>
  api.get(`/products/top_sold/?period=${period}`);

// Stock de los productos
export const getProductStocks = () => api.get('/products/stock/');

// Productos sin movimiento
export const getProductsWithoutMovement = () => api.get('/products/no_movement/');

// Total Categorias
export const getCategorySummary = () => api.get('/category/summary/');

//Valor total del stock
export const getStockValue = () => api.get('/products/stock_value/');

// Ganancias por día
export const getEarningsByDay = () => api.get('/products/earnings_by_day/');

// Total Entries (Purchases)
export const getTotalEntries = () => api.get('/products/total_entries/');

// Total Exits (Sales)
export const getTotalExits = () => api.get('/products/total_exits/');

// Profit (Sales - Purchases)
export const getProfit = () => api.get('/products/profit/');

// Profit Percentage
export const getProfitPercentage = () => api.get('/products/profit_percentage/');

export const getAmountProductsByCategory = async () => {
  try {

    const products = (await getProducts()).data;
    const productCountByCategory = new Map<number, number>();
    
    products.forEach((product) => {
      const currentCount = productCountByCategory.get(product.id_category) || 0;
      productCountByCategory.set(product.id_category, currentCount + 1);
    });
    
    const result = await Promise.all(
      Array.from(productCountByCategory.entries()).map(async ([categoryId, count]) => {
        const category = (await getCategory(categoryId)).data;
        return {
          category: category.name,
          products: count
        };
      })
    );
    
    result.sort((a, b) => a.category.localeCompare(b.category));
    return result;
    
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    throw error;
  }
}

export default api;