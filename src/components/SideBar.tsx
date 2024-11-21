import React from "react";
import {useDrag} from "react-dnd";
import {mockData} from "../mockData"


const SideBar: React.FC = () => {
    const DragItem: React.FC<{ id: string; src: string }> = ({id, src}) => {
        const [, drag] = useDrag(() => ({
            type: "IMAGE",
            item: {id, src},
        }));
        return <img ref={drag} src={src} alt="draggable" className="draggable-item"/>;
    };

    return (
        <div className="left-bar">
            {mockData.length > 0 && mockData.map((item) => (
                <DragItem key={item.id} id={item.id} src={item.src}/>
            ))}
        </div>
    );
};

export default SideBar;
