

class formStyles {
    inputStyle: string;
    buttonStyle: string;
    
    constructor(){
      // style for textarea too. 
        this.inputStyle = ` bg-gray-300
    border-gray-400 
    text-gray-900
      appearance-none 
      border-2 
      rounded
      w-full
      py-3
      px-4
      focus:outline-none
      focus:bg-white
      focus:border-purple-600 `;
      
    this.buttonStyle =`
    bg-blue-600
    font-bold
    text-white
    rounded
    py-2
    px-4
    border-b-4
    border-blue-800
    hover:bg-blue-400`
    }


}


export const FormStyles = new formStyles();