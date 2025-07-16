"use client";

import { Provider } from "react-redux";
import {store} from "@/service/RTK/store"
const ProviderStoreClient = ({children})=>{
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ProviderStoreClient