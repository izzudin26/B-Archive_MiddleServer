export interface ITransaction {
    receiverName: string
    receiverNumber: number
    transactionDate: Date
    referenceNumber: string
    amount: number
    transactionType: string
    note: string
    imageUri?: string
}
