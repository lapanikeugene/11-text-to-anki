class regs{
    SelectAllPunctuationMarks: RegExp;
    SelectNewStringSign: RegExp;

    constructor(){
        this.SelectAllPunctuationMarks = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
        this.SelectNewStringSign=/\r?\n/;

    }


}





export const Regs = new regs();