import { createBrowserRouter } from "react-router-dom";
import { Signup } from "./pages/auth/signup";
import { Login } from "./pages/auth/login";
/* import { CreateGuide } from "./pages/create-guide/create-guide";
 */import { GuideWelcome } from "./pages/guide-welcone/guide-welcome";
import { Home } from "./pages";
import { Settings } from "./pages/settings/settings";
import { Properties } from "./pages/Properties/Properties";
import { Tags } from "./pages/tags/tags";
import { AddEditProperties } from "./pages/Properties/AddEditProperties";
import { Guides } from "./pages/guides/guides";
import { GuideSettings } from "./pages/guides/guideSettings";
import { CreateGuides } from "./pages/guides/create-guides";
import { GuestView } from "./pages/guides/guestView";
import Billing from "./pages/billing/billing";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PropertyInfo } from "./pages/Properties/propertyInfo";
import { Box, Button, Text } from "@chakra-ui/react";
import { GuideContent } from "./pages/guides/guideContent";
import { Forget } from "./pages/auth/forget";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/properties",
        element: <ProtectedRoute Component={<Properties />} />
    },
    {
        path: "/properties/details/:propertyId",
        element: <ProtectedRoute Component={<PropertyInfo />} />
    },
    {
        path: "/properties/create",
        element: <ProtectedRoute Component={<AddEditProperties />} />,
    },
    {
        path: "/catagories",
        element: <ProtectedRoute Component={<Tags />} />
    },
    {
        path: "/catagories/:tagName",
        element: <ProtectedRoute Component={<Guides />} />
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
        path: "/forget-password",
        element: <Forget />,
    },

/*     {
        path: "/guides/:tagId",
        element: <Guides />,
    }, */
    {
        path: "/guides/create",
        element: <CreateGuides />,
    },
    {
        path: "/guides/content/:id",
        element: <GuideContent />,
    },

    {
        path: "/guides/settings/:guideId",
        element: <GuideSettings />,
    },
    {
        path: "/guides/",
        element: <GuestView />,
    },
    {
        path: "/billing",
        element: <Billing />,
    },
    {
        path: "/settings",
        element: <Settings />,
    },
    {
        path: "/success",
        element: (
            <Box>
                <Text fontSize={'25px'} p={'30px'} color={'#10de10'} >Successfully Subscrribed to 10$/per-property. Thank you for using our service</Text>
            </Box>
        ),
    },
]);

export { router };