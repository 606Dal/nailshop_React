import axios from "axios";
import type { ProductAdd, ProductModify, ProductRead } from "~/types/product";

const host = import.meta.env.VITE_API_HOST_PRODUCT

export async function productList(page:string, size:string) {
    
    const res = await axios.get(`${host}/list?page=${page}&size=${size}`)
    // const res = await jwtAxios.get(`${host}/list?page=${page}&size=${size}`)

    return res.data
}

export async function addProduct(product: ProductAdd) {

    const formData = new FormData()

    formData.append("pname", product.pname)
    formData.append("pdesc", product.pdesc)
    formData.append("price", product.price.toString())

    // 이미지 파일들 추가
    product.files.forEach(file => {
        formData.append("files", file)
    })

    const res = await axios.post(`${host}/add`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    
    return res.data
}

export async function productRead(pno: number): Promise<ProductRead> {

    const res = await axios.get<ProductRead>(`${host}/${pno}`)

    return res.data
}

export async function modifyProduct(pno: number, product: ProductModify) {
    const formData = new FormData()

    formData.append("pname", product.pname)
    formData.append("pdesc", product.pdesc)
    formData.append("price", product.price.toString())

    product.files.forEach(file => {
        formData.append("files", file)
    })

    const res = await axios.post(`${host}/modify/${pno}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })

    return res.data
}
