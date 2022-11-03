import { createBrowserRouter } from "react-router-dom";
import { Signup } from "./pages/auth/signup";
import { Login } from "./pages/auth/login";
/* import { CreateGuide } from "./pages/create-guide/create-guide";
 */import { GuideWelcome } from "./pages/guide-welcone/guide-welcome";
import { Home } from "./pages";
import { Properties } from "./pages/Properties/Properties";
import { Tags } from "./pages/tags/tags";
import { AddEditProperties } from "./pages/Properties/AddEditProperties";
import { Guides } from "./pages/guides/guides";
import { GuideSettings } from "./pages/guides/guideSettings";
import { CreateGuides } from "./pages/guides/create-guides";
import { GuestView } from "./pages/guides/guestView";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/properties",
        element: <Properties />,
    },
    {
        path: "/properties/create",
        element: <AddEditProperties />,
    },
    {
        path: "/tags",
        element: <Tags />,
    },

    {
        path: "/getting-started",
        element: <GuideWelcome />,
    },
/*     {
        path: "/create-guide",
        element: <CreateGuide />,
    }, */
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/guides/:tagId",
        element: <Guides />,
    },
    {
        path: "/guides/create",
        element: <CreateGuides />,
    },
    {
        path: "/guides/settings/:guideId",
        element: <GuideSettings />,
    },
    {
        path: "/guest/guides/",
        element: <GuestView />,
    },
]);

export { router };