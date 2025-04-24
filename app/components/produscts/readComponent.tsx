import { useNavigate } from "react-router";
import { useProductStore } from "~/store/productStore";
import type { ProductRead } from "~/types/product";


type ProductReadProps = {
    data: ProductRead;
    error: Error | null;
};

export default function ProductReadComponent({ data }: ProductReadProps) {

    // console.log("ProductReadComponent Data: ", data)

    const imageUrl = `http://localhost/uploads/`;
    
    const navigate = useNavigate();
    const setCurrentProduct = useProductStore((state) => state.setCurrentProduct);

    const handleModify = () => {
        setCurrentProduct(data); // zustand에 저장
        navigate(`/products/modify/${data.pno}`); // 페이지 이동
    };
    

    return (
        <div className="p-4 space-y-6">
            {/* <div className={'text-4xl'}>Read Component</div> */}
            
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-800 to-purple-300 text-transparent bg-clip-text">
                {data.pname}
            </h1>
            <p className="text-lg font-semibold">{data.price.toLocaleString()}원</p>
            <p>{data.pdesc}</p>

            <div className="text-sm text-gray-500">
                등록일: {new Date(data.regDate).toLocaleString()}<br />
                수정일: {new Date(data.modDate).toLocaleString()}
            </div>

            {/* 이미지 세로 한 줄로 정렬 */}
            <div className="flex flex-col gap-6 items-center sm:items-start">
                {data.imageNames.map((img, idx) => (
                    <img
                        key={idx}
                        src={imageUrl + `${img}`}
                        alt={`product-${idx}`}
                        className="w-full max-w-sm rounded-lg border shadow-sm"
                    />
                ))}
            </div>

            {/* 수정/삭제 버튼 */}
            <div className="flex justify-center gap-6 mt-6">
                <button
                    onClick={handleModify}
                    className="px-5 py-2 bg-sky-200 rounded hover:bg-blue-300 transition"
                >
                    수정
                </button>
                <a
                    href="#"
                    className="px-5 py-2 bg-red-400 text-white rounded hover:bg-red-600 transition"
                >
                    삭제
                </a>
            </div>

        </div>
    );

}
