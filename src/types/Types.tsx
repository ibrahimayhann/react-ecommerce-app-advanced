export interface UserType {
    id: string,
    username: string,
    password: string
}
export interface ProductType {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: RatingType,
    quantity: number,
    size: string

}
interface RatingType {
    rate: number,
    count: number
}