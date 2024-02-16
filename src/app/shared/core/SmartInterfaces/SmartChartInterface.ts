interface SmartChartConfig{
    /**
     * 
     */
    type:"bar",
    /**
     * 
     */
    name:string,

    /**
     * 
     */
    labels?:string[]
    /**
     * 
     */
    dataSet?:SmartChartDataSetConfig[]
    responsive?:string
}

interface SmartChartDataSetConfig{
    label?:string,
    data:any[],
    backgroundColor?:string
}

export{
    SmartChartConfig,
    SmartChartDataSetConfig
}
