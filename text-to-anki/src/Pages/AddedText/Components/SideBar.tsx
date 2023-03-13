import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { FormStyles } from "../../_assets/css/FormStyles";
import '../assets/styles.css'
import { AddedTextStore } from "../Store/AddedTextStore";
import { SettingsStore } from "../Store/SettingsStore";
import { useToggleSideBar } from "./TextViews/hooks/toggleSideBar";
import { fontSizesSettings, paragraphsPerPageDefault, paragraphsPerPageSettings } from "./WordSettings";

const SideBar =()=>{
    const [sidebarStyle, setSidebarStyle] = useState({});
    const {isSidebar,setFontSize} = SettingsStore(s=>s);
    const [isOpen,setIsOpen] = useState(false);
    const [parPerPage,setParPerPage] = useState(paragraphsPerPageDefault);

    const setPage = AddedTextStore(s=>s.setPage);
    const [handleToggleSideBar] =useToggleSideBar()
    
    useEffect(()=>{
        setIsOpen(isSidebar);
    },[isSidebar])


    const handleExited = () => {
        setSidebarStyle({});
      };
    
      const handleSidebarEnter = () => {
        setSidebarStyle({   transform: "translateX(0)",
                            position: "sticky", top: "0",
                            transition: "transform 0.2s ease-out"       });
      };
    
      const handleSidebarExit = () => {
        setSidebarStyle({ transform: "translateX(-1000%)",
                            position: "sticky", top: "0", });
      };

      const [settingsUpdater,setSettingsUpdater] = useState(0);
      const handleSettingsParagraphs =(e:React.ChangeEvent<HTMLSelectElement>)=>{
        localStorage.setItem('settings-paragraphs-per-page',e.target.value);
        setParPerPage(Number(e.target.value));

        setSettingsUpdater(s=>++s);

      }

      const handleSettingsSize =(e:React.ChangeEvent<HTMLSelectElement>)=>{
        localStorage.setItem('settings-font-size',e.target.value);
        setFontSize(e.target.value);
        setPage(0);
        setSettingsUpdater(s=>++s);
      }

    return( <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="sidebar"
        appear={true}
        onExited={handleExited}
        onEnter={handleSidebarEnter}
        onExit={handleSidebarExit}
      >
        <div className="sidebar flex flex-col gap-4 justify-start items-start p-3" style={sidebarStyle} >
          <h2 className="text-2xl">Settings</h2>
          <div>Select amount of paragraphs per page </div>
          <div className="w-100 text-center">
            <select className="w-100" onChange={handleSettingsParagraphs}>
                <option>Paragraphs Per Page</option>
                {paragraphsPerPageSettings.map((a,i)=>{
                    return(
                        <option value={a}>{a}</option>
                    )
                })}
            </select>
          </div>
          <div>Select font size </div>
          <div className="w-100 text-center">
            <select className="w-100"  onChange={handleSettingsSize}>
                <option>Font size</option>
                {fontSizesSettings.map((a,i)=>{
                    return(<>
                        <option className={a} value={a}>Size {i}</option>
                    </>)
                })}
            </select>
          </div>
          <div>
            <button className={FormStyles.buttonStyle} onClick={handleToggleSideBar} >Close</button>
          </div>
        </div>
      </CSSTransition>

   )
}


export default SideBar;