import { SmartDialogConfig } from "src/app/shared/core/SmartInterfaces/SmartDialogInterface";
/**
 * 
 * @param title 
 * @param msg 
 * @returns 
 */
const default_delete_dialog=(title:string="",msg:string="")=>{
    let dialog_options:SmartDialogConfig = {
        type:"DELETE-ALERT",
        title:title.length > 1? title :"Do you want to Delete ?",
        message:msg.length > 1 ? msg : "The Action cannot be reverted",
        width:40,
        buttons:[
          {
            label:"Cancel",
            class:"is-danger",
            action:"no"
          },
          {
            label:"Yes Do It!",
            class:"is-success",
            action:"yes"
          },       
        ]
      };
    return dialog_options;
}
/**
 * 
 */
const default_form_dialog=(data)=>{
  const {title="",msg="",template=null} = data;
  let dialog_options:SmartDialogConfig = {
      type:"SMART-ACTION",
      title:title.length > 1 ? title :"New",
      template:template,
      width:60        
    };
  return dialog_options;
}

const default_iframe_dialog=(data)=>{
  const {title="",msg="",iframe=null} = data;
  let dialog_options:SmartDialogConfig = {
      type:"SMART-ACTION",
      title:title.length > 1 ? title :"",
      iframe:iframe,
      width:95        
    };
  return dialog_options;
}

export{
    default_delete_dialog,
    default_form_dialog,
    default_iframe_dialog
}