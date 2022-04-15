declare global {
    interface Window {
        Xrm?: any
    }
}


export const getVersion = async () => {
    var e = await window.parent.Xrm.Page.context.getVersion();
    return window.parent.Xrm.Page.context.getClientUrl() + "/api/data/v" + e.slice(0, e.indexOf(".") + 2)
}