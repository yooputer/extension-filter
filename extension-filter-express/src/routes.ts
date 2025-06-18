import GetFilteredExtensionsAction from "./controller/GetFilteredExtensionsAction";

export const AppRoutes = [
    {
        path: "/api/filtered-extensions",
        method: "get",
        action: GetFilteredExtensionsAction
    },
]