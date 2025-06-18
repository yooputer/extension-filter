import GetTestAction from "./controller/GetTestAction";
import GetFilteredExtensionsAction from "./controller/GetFilteredExtensionsAction";

export const AppRoutes = [
    {
        path: "/api/test",
        method: "get",
        action: GetTestAction
    },
    {
        path: "/api/filtered-extensions",
        method: "get",
        action: GetFilteredExtensionsAction
    },
]