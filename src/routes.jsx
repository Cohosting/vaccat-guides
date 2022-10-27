import { createBrowserRouter } from "react-router-dom";
import { CreateGuide } from "./pages/create-guide/create-guide";
import { GuideWelcome } from "./pages/guide-welcone/guide-welcome";

const router = createBrowserRouter([
    {
        path: "/getting-started",
        element: <GuideWelcome />,
    },
    {
        path: "/create-guide",
        element: <CreateGuide />,
    },
]);

export { router };