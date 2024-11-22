import React from "react";
import {useDrop} from "react-dnd";
import {MainPageItemProps} from "../types";
import {FaTrashAlt} from "react-icons/fa";

interface MainPageProps {
    items: MainPageItemProps[];
    setItems: React.Dispatch<React.SetStateAction<MainPageItemProps[]>>;
}

const MainPage: React.FC<MainPageProps> = ({items, setItems}) => {

    const [, drop] = useDrop(() => ({
        accept: "IMAGE",
        drop: (item: { id: string; src: string }) => {
            const newItem: MainPageItemProps = {
                id: item.id + Math.random(),
                src: item.src,
                width: 200,
                height: 100,
            };
            setItems((prev) => [...prev, newItem]);
        },
    }));

    const handleResize = (
        id: string,
        newWidth: number,
        newHeight: number
    ) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        width: Math.max(200, Math.min(newWidth, 1200)),
                        height: Math.max(100, Math.min(newHeight, 600)),
                    }
                    : item
            )
        );
    };

    const handleDelete = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div
            ref={drop}
            className="right-bar"
        >
            {items.map((item) => (
                <div
                    key={item.id}
                    className="right-bar-item"
                    style={{
                        width: item.width,
                        height: item.height,
                    }}
                >
                    <img
                        src={item.src}
                        alt="RightBar Item"
                        className="main-page-image"
                    />
                    <div
                        className="resize-handle"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            const startX = e.clientX;
                            const startY = e.clientY;
                            const startWidth = item.width;
                            const startHeight = item.height;

                            const handleMouseMove = (e: MouseEvent) => {
                                const deltaX = e.clientX - startX;
                                const deltaY = e.clientY - startY;
                                const newWidth = startWidth + deltaX;
                                const newHeight = startHeight + deltaY;
                                handleResize(item.id, newWidth, newHeight);
                            };

                            const handleMouseUp = () => {
                                document.removeEventListener("mousemove", handleMouseMove);
                                document.removeEventListener("mouseup", handleMouseUp);
                            };

                            document.addEventListener("mousemove", handleMouseMove);
                            document.addEventListener("mouseup", handleMouseUp);
                        }}
                    ></div>
                    <FaTrashAlt
                        className="delete-button"
                        onClick={() => handleDelete(item.id)}
                    />
                </div>
            ))}
        </div>
    );
};

export default MainPage;
