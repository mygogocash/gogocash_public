export interface IProp {
    setIsOpenAddWithdraw: React.Dispatch<React.SetStateAction<boolean>>
    isOpenAddWithdraw: boolean
    isOpenEditWithdraw: boolean
    setIsOpenEditWithdraw: React.Dispatch<React.SetStateAction<boolean>>
}

export interface DataEdit {
    id: number
    name: string
    description: string
}