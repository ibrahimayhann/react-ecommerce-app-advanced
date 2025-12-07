import axios from "axios";
import type { ProductType } from "../types/Types";

class ProductService {

    BASE_URL = "https://fakestoreapi.com";

    async getAllProducts(): Promise<ProductType[]> {
        const response = await axios.get(`${this.BASE_URL}/products`);
        return response.data;
    }




    async getProductById(productId: number): Promise<ProductType> {
        const response = axios.get(`${this.BASE_URL}/products/${productId}`)
        return (await response).data
    }
}

export default new ProductService();