import ProductListComponent from '~/components/produscts/listComponent';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { productList } from '~/api/productAPI';
 
const ProductListPage = () => {
    const [searchParams] = useSearchParams();
    const pageStr = searchParams.get("page") || "1";
    const sizeStr = searchParams.get("size") || "10";

    const query = useQuery({
        queryKey: ['products', pageStr, sizeStr],
        queryFn: async() => {
            await new Promise(resolve => setTimeout(resolve, 2000)); // 로딩 확인용

            const products = await productList(pageStr, sizeStr);
            return products;
        },
        staleTime: 10 * 60 * 1000,
        retry: false
    });

    const { isFetching, data, error } = query;
  
    console.log(data)

    return (
        <div>
            <ProductListComponent data={data} isFetching={isFetching} error={error} />
        </div>
    );
}
 
 export default ProductListPage;