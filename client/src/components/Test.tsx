import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Sample images for our collage
const sampleImages = [
    { id: 1, src: "/api/placeholder/150/150", title: "Image 1" },
    { id: 2, src: "/api/placeholder/150/150", title: "Image 2" },
    { id: 3, src: "/api/placeholder/150/150", title: "Image 3" },
    { id: 4, src: "/api/placeholder/150/150", title: "Image 4" },
    { id: 5, src: "/api/placeholder/150/150", title: "Image 5" },
];

// Item types for react-dnd
const ItemTypes = {
    IMAGE: 'image'
};

// Draggable Image Component
const DraggableImage = ({ image, onRemove = null }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.IMAGE,
        item: { id: image.id, image },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    return (
        <div
            ref={drag}
            className={`bg-white p-2 rounded shadow-md cursor-move transition-opacity ${
                isDragging ? 'opacity-50' : 'opacity-100'
            }`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <img
                src={image.src}
                alt={image.title}
                className="w-24 h-24 object-cover"
            />
            <p className="text-center mt-1 text-sm">{image.title}</p>
            {onRemove && (
                <button
                    onClick={() => onRemove(image.id)}
                    className="mt-1 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                    Remove
                </button>
            )}
        </div>
    );
};

// Drop Zone Component for individual collage slots
const CollageSlot = ({ position, onDrop, occupiedBy = null, onRemove }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.IMAGE,
        drop: (item) => {
            onDrop(item.image, position);
        },
        canDrop: () => !occupiedBy, // Can only drop if slot is empty
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });

    const backgroundColor = isOver
        ? (canDrop ? 'bg-green-200' : 'bg-red-200')
        : canDrop
            ? 'bg-blue-100'
            : 'bg-gray-100';

    return (
        <div
            ref={drop}
            className={`absolute w-28 h-32 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors ${backgroundColor} ${
                canDrop ? 'border-blue-400' : 'border-gray-300'
            }`}
            style={{
                left: position.x,
                top: position.y
            }}
        >
            {occupiedBy ? (
                <DraggableImage
                    image={occupiedBy}
                    onRemove={onRemove}
                />
            ) : (
                <div className="text-gray-400 text-sm text-center">
                    Drop<br />Here
                </div>
            )}
        </div>
    );
};

// Main Collage Component
const CollageAlbum = () => {
    const [availableImages, setAvailableImages] = useState([...sampleImages]);
    const [collageSlots, setCollageSlots] = useState([
        { id: 1, position: { x: 20, y: 20 }, image: null },
        { id: 2, position: { x: 160, y: 20 }, image: null },
        { id: 3, position: { x: 300, y: 20 }, image: null },
        { id: 4, position: { x: 90, y: 180 }, image: null },
        { id: 5, position: { x: 230, y: 180 }, image: null },
    ]);

    const handleDropToCollage = (image, position) => {
        // Add image to collage slot
        setCollageSlots(prev =>
            prev.map(slot =>
                slot.position.x === position.x && slot.position.y === position.y
                    ? { ...slot, image }
                    : slot
            )
        );

        // Remove from available images
        setAvailableImages(prev => prev.filter(img => img.id !== image.id));
    };

    const handleRemoveFromCollage = (imageId) => {
        // Find the image in collage
        const slot = collageSlots.find(slot => slot.image?.id === imageId);
        if (!slot) return;

        // Remove from collage
        setCollageSlots(prev =>
            prev.map(s =>
                s.id === slot.id ? { ...s, image: null } : s
            )
        );

        // Add back to available images
        setAvailableImages(prev => [...prev, slot.image]);
    };

    return (
        <div className="flex flex-col items-center p-4 w-full">
            <h1 className="text-2xl font-bold mb-6">React DnD Collage Album</h1>

            <div className="flex w-full gap-6">
                {/* Available images panel */}
                <div className="w-1/3 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Available Images</h2>
                    <div className="flex flex-wrap gap-4">
                        {availableImages.map(image => (
                            <DraggableImage key={image.id} image={image} />
                        ))}
                    </div>
                    {availableImages.length === 0 && (
                        <p className="text-gray-500 text-center">All images are in the collage!</p>
                    )}
                </div>

                {/* Collage area */}
                <div className="w-2/3 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-4 relative h-96">
                    <h2 className="text-lg font-semibold mb-4">Collage Area</h2>

                    {/* Render collage slots */}
                    {collageSlots.map(slot => (
                        <CollageSlot
                            key={slot.id}
                            position={slot.position}
                            occupiedBy={slot.image}
                            onDrop={handleDropToCollage}
                            onRemove={handleRemoveFromCollage}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-6 text-sm text-gray-600 max-w-2xl">
                <p>• Drag images from the left panel to any available slot in the collage area</p>
                <p>• Drop zones will highlight in green when you can drop, red when occupied</p>
                <p>• Click "Remove" on images in the collage to return them to the available panel</p>
                <p>• Images in the collage can also be dragged to other empty slots</p>
            </div>
        </div>
    );
};

// Main App with DnD Provider
export const Test = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <CollageAlbum />
        </DndProvider>
    );
}