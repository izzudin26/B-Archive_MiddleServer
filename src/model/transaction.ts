export interface ITransaction {
    receiverName: string
    receiverNumber: string
    transactionDate: Date
    referenceNumber: string
    amount: number
    transactionType: string
    note: string
    imageUri?: string
}
