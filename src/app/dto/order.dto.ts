export interface IOrderBook {
    book: string;
    quantity: number;
}

export interface IOrderDTO {
    owner: string;
    totalPrice: number;
    books: IOrderBook[];
}