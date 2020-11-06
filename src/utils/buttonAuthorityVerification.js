/* eslint-disable */
export function buttonAuthorityVerification(buttonName){
  let menu=vm.$route.path;
  let authorityButton=vm.$store.getters.buttonAuthority;
  if(authorityButton[menu]){
    if(authorityButton[menu].indexOf(buttonName)>-1){
      return true;
    }
    else{
      return false;
    }
  }
  else{
    return false;
  }
}