export interface ITransaction {
    receiverName: string
    receiverNumber: number
    transactionDate: Date
    referenceNumber: number
    amount: number
    transactionType: string
    note: string
    imageUri?: string
}
