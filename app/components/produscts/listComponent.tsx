
import { Link, Navigate, useSearchParams } from "react-router";
import type { ProductListResponse } from "~/types/product";

type ProductListProps = {
    data: ProductListResponse;
    isFetching: boolean;
    error: Error | null;
};

function ProductListComponent({ data, isFetching, error }: ProductListProps) {

    // if(error) {

    //     console.log(error)

    //     return(
    //         <Navigate to="/member/login" replace />
    //     )
    // }

    return ( 
        <div className="p-4">
            <div className="text-4xl font-bold mb-4">Gel Nails</div>

            {isFetching && (
                <div className="text-2xl bg-amber-200 p-2 rounded">Loading...</div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.dtoList.map((product) => {
                    const thumbnailUrl = `http://localhost/uploads/s_${product.imgName}`;
                    return (
                        <Link to={`/products/${product.pno}`} key={product.pno}>
                            <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <img src={thumbnailUrl} alt={product.pname} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                <h2 className="text-xl font-semibold">{product.pname}</h2>
                                <p className="text-gray-500 truncate">{product.pdesc}</p>
                                <div className="mt-2 text-lg font-bold">{product.price.toLocaleString()}원</div>
                                <div className="text-sm text-gray-400">
                                    평점: {product.avgRating ?? 0} / 리뷰: {product.reviewCnt ?? 0}개
                                </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductListComponent

