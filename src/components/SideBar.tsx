import React from "react";
import { useDrag } from "react-dnd";

const items = [
    { id: "1", src: "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/cr/car-versions/12566-2019-mini-cooper-s" },
    { id: "2", src: "https://m.atcdn.co.uk/vms/media/a8218b0600924575a7f1db466bd7eca6.jpg" },
    { id: "3", src: "https://images.unsplash.com/photo-1635261231256-91fa48bd877d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWluaSUyMGNvb3BlciUyMHN8ZW58MHx8MHx8fDA%3D" },
];

const SideBar: React.FC = () => {
    const DragItem: React.FC<{ id: string; src: string }> = ({ id, src }) => {
        const [, drag] = useDrag(() => ({
            type: "IMAGE",
            item: { id, src },
        }));
        return <img ref={drag} src={src} alt="draggable" className="draggable-item" />;
    };

    return (
        <div className="left-bar">
            {items.map((item) => (
                <DragItem key={item.id} id={item.id} src={item.src} />
            ))}
        </div>
    );
};

export default SideBar;
