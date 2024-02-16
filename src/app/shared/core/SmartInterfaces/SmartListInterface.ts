interface SmartListConfig{
    type:"URL",
    urls?:SmartListUrlConfig,
    dbIndex:string,
    plaseHolder?:string,
    formIcon?:string
    addButtonLabel?:string,
    updateButtonLabel?:string,
    formPreFillData?:any
}

interface SmartListUrlConfig{
    getAllUrl:string,
    deleteUrl:string,
    insertUrl:string,
    updateUrl:string
}

export {
    SmartListConfig,
    SmartListUrlConfig
}