interface ProductBase {
    pname: string,
    pdesc: string,
    price: number,
}


interface ProductImage {
    imgName: string,
    ord: number
}

interface Product extends ProductBase {
    pno: number,
    imgName: string,
    avgRating: number,
    reviewCnt: number,
    regDate?: string,  // BaseEntity 상속 필드
    modDate?: string,   // BaseEntity 상속 필드
}

interface ProductAll extends ProductBase {
    pno: number,
    images: ProductImage[],
    avgRating: number,
    reviewCnt: number,
    regDate?: string,
    modDate?: string, 
}

export interface ProductListResponse {
    dtoList: Product[],
    total: number,
    page: number,
    size: number,
    start: number,
    end: number,
    prev: boolean,
    next: boolean,
}

export interface ProductAdd extends ProductBase {
    imageNames: string[],
    files: File[], // 업로드 이미지
}

export interface ProductRead extends ProductBase {
    pno: number,
    imageNames: string[],
    regDate: string,
    modDate: string, 
}

export interface ProductModify extends ProductBase {
    pno: number,
    imageNames: string[],
    files: File[], // 업로드 이미지
}



