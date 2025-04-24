import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import ProductReadComponent from '~/components/produscts/readComponent';
import { readProduct } from '~/api/productAPI';

export default function ReadPage() {
    const { pno } = useParams<{ pno: string }>();

    const query = useQuery({
        queryKey: ['productRead', pno],
        queryFn: async () => {
            // await new Promise(resolve => setTimeout(resolve, 2000)); // 로딩 확인용

            console.log("---------------query run-------------------")

            const products = await readProduct(Number(pno));
            return products;
        },
        enabled: !!pno,
        staleTime: 10 * 60 * 1000,
        retry: false
    });

    const { isFetching, data, isError, error } = query;

    console.log(data)

    return (
        <div>
            {/* <div className={'text-4xl'}>Read Page</div> */}

            {isFetching && (
                <div className="text-2xl bg-amber-200 p-2 rounded">Loading...</div>
            )}

            {data && 
                <ProductReadComponent data={data} error={error} />
            }
        </div>
    );
}
