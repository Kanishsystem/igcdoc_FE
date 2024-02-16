import { TemplateRef } from "@angular/core"

interface SmartDialogConfig{
    /**
     * 
     */
    type:"DELETE-ALERT"|"LINK-ALERT"|"SMART-ACTION"|"DEFAULT-ALERT"|"CUSTOM-ALERT",
    /**
     * 
     */
    icon?:string,
    /**
     * 
     */
    class?:string,
    /**
     * 
     */
     title?:string,
     /**
      * 
      */
     message?:string
     /**
      * 
      */
    template?:TemplateRef<any>,
    /**
     * 
     */
    buttons?:SmartDialogButton[]
    /**
     * 
     */
    width?:number
    /**
     * 
     */
    iframe?:string,
    /**
     * 
     */
    iframe_payload?:any
}
/**
 * 
 */
interface SmartDialogButton{
    label:string,
    action:any,
    class?:string
}

export{
    SmartDialogConfig,
    SmartDialogButton
}


