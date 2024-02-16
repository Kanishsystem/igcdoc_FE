

interface SmartDashCards{
    /**
     * 
     */
    type:"STYLE_BORDER"|"ICON_TOP"|"ICON_RIGHT",
    /**
     * 
     */
    cards:SmartDashCard[]
    /**
     * 
     */
    cardClass?:string
}

interface SmartDashCard{ 
    /**
     *  Themem Color 
     */  
    color:"GREEN"|"PINK"|"YELLOW"|"RED"|"BLUE"|"INDIGO"|"WHITE",
    /**
     * Dashboard Title
     */
    title:string,
    /**
     * value index in data
     */
    valueIndex:string
    /**
     * icon 
     */
    icon?:string,
    /**
     * icon position
     */
    iconSide?:"LEFT"|"RIGHT"|"TOPRIGHT",
    /**
     * carrot icon 
     */
    carrotIcon?:string
    /**
     * 
     */
    cardFootData?:any[],
    /**
     * 
     */
    cardFooterMsg?:string
    
}

export {
    SmartDashCards,
    SmartDashCard
}