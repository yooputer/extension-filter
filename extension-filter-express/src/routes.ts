import GetFilteredExtensionsAction from "./controller/GetFilteredExtensionsAction";
import PostFilteredExtensionsAction from "./controller/PostFilteredExtensionsAction";

export const AppRoutes = [
    {
        path: "/api/filtered-extensions",
        method: "get",
        action: GetFilteredExtensionsAction
    },
    {
        path: "/api/filtered-extensions",
        method: "post",
        action: PostFilteredExtensionsAction
    },
]