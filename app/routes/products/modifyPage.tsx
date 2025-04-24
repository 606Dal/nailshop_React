import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { readProduct } from "~/api/productAPI";
import ProductModifyComponent from "~/components/produscts/modifyComponent";
import { useProductStore } from "~/store/productStore";

export default function() {

    const { pno } = useParams<{ pno: string }>()
    const currentProduct = useProductStore((state) => state.currentProduct);

    const { data: productFromQuery, isFetching, error } = useQuery({
        queryKey: ['productRead', pno],
        queryFn: async () => {
          if (!pno) throw new Error('No product number in URL');
          console.log("---------------ModifyPage read query run-------------------")
          const product = await readProduct(Number(pno));
          return product;
        },
        enabled: !currentProduct && !!pno,
        staleTime: 10 * 60 * 1000,
        retry: false,
      });
    
      const product = currentProduct || productFromQuery;
    
      if (!product) return <div>로딩 중이거나 상품 정보를 찾을 수 없습니다.</div>;


    return(
        <div>
            {isFetching && (
                <div className="text-2xl bg-amber-200 p-2 rounded">Loading...</div>
            )}

            <div className={'text-4xl text-center'}>상품 수정</div>
            {product && 
                <ProductModifyComponent product={product} />
            }
         </div>
    );
}