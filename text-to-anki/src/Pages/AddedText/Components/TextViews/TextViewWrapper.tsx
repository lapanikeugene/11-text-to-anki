import TextViewJapan from "./TextViewJapan"
import TextViewSpaced from "./TextViewSpaced"
import { WrapperTextVariants } from "./WrapperTextVariants"

const TextViewWrapper = (params:{lang:string})=>{
    const ComponentsArray=[ 
        {variant:WrapperTextVariants.japan, component: [<TextViewJapan />]},
        {variant:WrapperTextVariants.spaced, component: [<TextViewSpaced />]},
                            ]


    return (<>
            {ComponentsArray.filter(a=>a.variant===params.lang).map((a,i)=>{

                    return(<>
                    {a.component}
                    </>)

            })}
    </>)
}


export default TextViewWrapper