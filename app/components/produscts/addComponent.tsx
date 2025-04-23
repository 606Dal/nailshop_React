import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { addProduct } from "~/api/productAPI";
import type { ProductAdd } from "~/types/product";


// const initProduct: ProductAdd = {
//     pname: '',
//     pdesc: '',
//     price: 0,
//     imageNames: [],
//     files: [],
//   };

function ProductAddComponent() {

    // 업로드 파일명 읽어 오기
    const formRef = useRef<HTMLFormElement>(null);

    // React Query 등록 요청
    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
        const pname = formData.get("pname");
        const pdesc = formData.get("pdesc");
        const price = formData.get("price");
        const files = formData.getAll("files") as File[];

        const dto: ProductAdd = {
            pname: pname ? String(pname) : "",
            pdesc: pdesc ? String(pdesc) : "",
            price: price ? Number(price) : 0,
            imageNames: files.map(file => file.name),
            files,
        };

        console.log(dto)
        // return await addProduct(dto);
        },
        onSuccess: () => {
        // alert("상품 등록 완료!");
        formRef.current?.reset();
        },
        onError: () => {
        alert("등록 중 오류가 발생했습니다.");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formRef.current) {
        const formData = new FormData(formRef.current);
        mutation.mutate(formData);
        }
    };

    // const [product, setProduct] = useState<ProductAdd>(initProduct)

    return (
        <div className="max-w-2xl mx-auto mt-10 px-4 py-6 bg-white shadow-lg rounded-xl">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Nail</h2>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pname" className="block text-sm font-medium text-gray-600 mb-1">
                  상품명
                </label>
                <input
                  name="pname"
                  id="pname"
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="상품 이름"
                  required
                />
              </div>
    
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-600 mb-1">
                  가격
                </label>
                <input
                  name="price"
                  id="price"
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="가격"
                  required
                  min={1}
                />
              </div>
            </div>
    
            <div>
              <label htmlFor="pdesc" className="block text-sm font-medium text-gray-600 mb-1">
                설명
              </label>
              <textarea
                name="pdesc"
                id="pdesc"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                placeholder="상품 설명"
                rows={4}
                required
              />
            </div>
    
            <div>
              <label htmlFor="files" className="block text-sm font-medium text-gray-600 mb-1">
                이미지 업로드
              </label>
              <input
                name="files"
                id="files"
                type="file"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                multiple
                accept="image/*"
                required
              />
            </div>
    
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {mutation.isPending ? "등록 중..." : "제출하기"}
            </button>
    
            {/* 메시지 출력 */}
            {mutation.isSuccess && <p className="text-green-600 text-center">등록 완료 🎉</p>}
            {mutation.isError && <p className="text-red-500 text-center">에러가 발생했어요 😢</p>}
          </form>
        </div>
    );
}

export default ProductAddComponent;