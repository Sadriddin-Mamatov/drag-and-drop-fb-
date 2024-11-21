import React, {useState, useEffect} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import SideBar from "./components/SideBar";
import MainPage from "./pages/MainPage";
import {MainPageItemProps} from "./types"


const App: React.FC = () => {
    const [items, setItems] = useState<MainPageItemProps[]>([]);
    const [viewOnly, setViewOnly] = useState(false);

    useEffect(() => {
        const savedItems = localStorage.getItem("draggedItems");
        if (savedItems) {
            setItems(JSON.parse(savedItems));
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("draggedItems", JSON.stringify(items));
        setViewOnly(true);
    };

    if (viewOnly) {
        return (
            <div className="view-only-container">
                {items.map((item) => (
                    <img
                        key={item.id}
                        src={item.src}
                        alt={item.alt}
                        style={{width: item.width, height: item.height}}
                    />
                ))}
            </div>
        );
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app-container">
                <SideBar/>
                <div className="right-bar-wrapper">
                    <nav className="navbar">
                        <button
                            onClick={handleSave}
                            className="save-button"
                        >
                            Save
                        </button>
                    </nav>
                    <MainPage items={items} setItems={setItems}/>
                </div>
            </div>
        </DndProvider>
    );
};

export default App;
