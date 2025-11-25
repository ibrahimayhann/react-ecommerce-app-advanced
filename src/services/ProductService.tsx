import axios from "axios";
import type { ProductType } from "../types/Types";

class ProductService {

    BASE_URL = "https://fakestoreapi.com";

    async getAllProducts(): Promise<ProductType[]> {
        const response = await axios.get(`${this.BASE_URL}/products`);
        return response.data;
    }
}

export default new ProductService();