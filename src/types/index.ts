export type Cake = {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
}

export type CartItem = Cake & {
    quantity: number
}
