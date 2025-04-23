import { useLocation } from "react-router";
import type { ProductRead } from "~/types/product";


export default function ProductModifyComponent() {

    const location = useLocation()
    const product = location.state as ProductRead

    console.log("----------ProductModifyComponent-----------")
    console.log(product)

    return ( 
        <div>
            <div>ProductModifyComponent</div>
        </div>
     );
}
