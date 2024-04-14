import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter,RouterProvider,Outlet} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
import Fileinput from "./Fileinput";
import Viewer from "./Viewer";
import ViewChart from "./ViewChart";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
const Root = () => {
    return (
        <Provider store = {appStore} >
            <div id="app">
                <Outlet/>
            </div>  
        </Provider>
     
    )
}

const appRouter = createBrowserRouter([{
    path : "/",
    element : <Root/>,
    children : [
        {
            path : "/",
            element : <Fileinput />
        },
        {
            path : "/transactions",
            element : <Viewer />
        },
        {
            path : "/chart",
            element : <ViewChart/>
        }
    ],
}])

root.render(<RouterProvider router = {appRouter}/>)
