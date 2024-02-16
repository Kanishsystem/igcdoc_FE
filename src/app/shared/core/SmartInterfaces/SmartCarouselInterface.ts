import { TemplateRef } from "@angular/core"

interface SmartCarouselConfig{
    type:"SLIDER",
    data:SmartCarouselItemConfig[]
}

interface SmartCarouselItemConfig{
     image?:string,
     title?:string,
     desc?:string
}

export{
    SmartCarouselConfig,
    SmartCarouselItemConfig
}