import { useParams } from "react-router";
import ProductModifyComponent from "~/components/produscts/modifyComponent";

export default function() {

    // const { pno } = useParams<{ pno: string }>();

    return(
        <div>
             <div className={'text-4xl text-center'}>상품 수정</div>
             <ProductModifyComponent />
         </div>
    );
}