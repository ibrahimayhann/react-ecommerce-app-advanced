import axios from "axios";
import type { ProductType } from "../types/Types";

class CategoryService {

    BASE_URL = "https://fakestoreapi.com";

    async getAllCategories(): Promise<string[]> {
        const response = await axios.get<string[]>(`${this.BASE_URL}/products/categories`);
        return response.data
    }

    async getProductsByCategory(category: string): Promise<ProductType[]> {
        const response = await axios.get<ProductType[]>(`${this.BASE_URL}/products/category/${category.toString()}`)
        return response.data
    }
}

export default new CategoryService();