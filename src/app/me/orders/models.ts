export interface Order {
    id: number;
    userId: number;
    price: number;
    status: 'processing' | 'shipped';
    createdAt: Date;
}
