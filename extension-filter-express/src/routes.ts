import {
    GetFilteredExtensionsAction,
    PostFilteredExtensionsAction,
    DeleteFilteredExtensionsAction, ResetFilteredExtensionsAction
} from "./controller/extension-filter"

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

    {
        path: "/api/filtered-extensions/all",
        method: "delete",
        action: ResetFilteredExtensionsAction
    },
]