import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { modifyProduct } from "~/api/productAPI";
import type { ProductModify, ProductRead } from "~/types/product";
import Modal from "../common/modal";

type ProductModifyProps = {
    product: ProductRead;
  };

export default function ProductModifyComponent({ product }: ProductModifyProps) {

    console.log("----------ProductModifyComponent-----------")
    console.log(product)

    // 업로드 파일명 읽어 오기
    const formRef = useRef<HTMLFormElement>(null);

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // React Query 등록 요청
    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            console.log("🚀 FormData Entries:");
            console.log([...formData.entries()]);

            const pname = formData.get("pname");
            const pdesc = formData.get("pdesc");
            const price = formData.get("price");
            const keepImages = formData.getAll("keepImages") as string[];
            const files = formData.getAll("files") as File[];

            const dto: ProductModify = {
                pno: product.pno,
                pname: pname ? String(pname) : "",
                pdesc: pdesc ? String(pdesc) : "",
                price: price ? Number(price) : 0,
                imageNames: keepImages,
                files,
            };

            console.log(dto.imageNames)
            // return await modifyProduct(dto);
        },
        onSuccess: () => {
            setShowModal(true);
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

    return (
        <div>
            {/* <div>ProductModifyComponent</div> */}
            <div className="max-w-2xl mx-auto mt-10 px-4 py-6 bg-white shadow-lg rounded-xl">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-2xl font-semibold text-center text-gray-800">Nail</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="pname" className="block text-sm font-medium text-gray-600 mb-1">
                                상품명
                            </label>
                            <input
                                type="text"
                                id="pname"
                                name="pname"
                                defaultValue={product.pname}
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
                                type="number"
                                id="price"
                                name="price"
                                defaultValue={product.price}
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
                            id="pdesc"
                            name="pdesc"
                            defaultValue={product.pdesc}
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
                        />
                    </div>

                    {product.imageNames.map((imgName) => (
                        <div key={imgName} className="flex items-center space-x-2">
                            <img
                                src={`http://localhost/uploads/s_${imgName}`}
                                alt="기존 이미지"
                                className="w-20 h-20 object-cover border rounded"
                            />
                            <label className="flex items-center space-x-1">
                                <input
                                    type="checkbox"
                                    name="keepImages"
                                    value={imgName}
                                    defaultChecked
                                />
                                <span className="text-sm text-gray-600">유지</span>
                            </label>
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        {mutation.isPending ? "등록 중..." : "제출하기"}
                    </button>

                    {/* ✅ 등록 완료 모달 */}
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                        <div className="text-center space-y-4">
                            <h2 className="text-xl font-semibold text-green-600">수정 완료 🎉</h2>
                            <p className="text-gray-700">상품이 성공적으로 수정되었습니다.</p>
                            <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            onClick={() => navigate(`/products/${product.pno}`)}
                            >
                            닫기
                            </button>
                        </div>
                        </Modal>
                    )}
                    {mutation.isError && <p className="text-red-500 text-center">에러가 발생했어요 😢</p>}
                </form>
            </div>

        </div>
    );
}
