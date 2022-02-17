export function validateOrderStatus(status: string) {
    if(status !== "active" && status !== "complete"){
        throw new Error('Invalid Status')
    }
}