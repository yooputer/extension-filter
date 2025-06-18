import GetFilteredExtensionsAction from "./controller/GetFilteredExtensionsAction";
import PostFilteredExtensionsAction from "./controller/PostFilteredExtensionsAction";
import DeleteFilteredExtensionsAction from "./controller/DeleteFilteredExtensionsAction";

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
    {
        path: "/api/filtered-extensions",
        method: "delete",
        action: DeleteFilteredExtensionsAction
    },
]