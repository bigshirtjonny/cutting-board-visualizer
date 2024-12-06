import React from 'react';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';

const DimensionInput = ({ woods, addWood, updateWood, deleteWood, reorderWoods }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderWoods(result.source.index, result.destination.index);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Initial Woods</h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="woodsList">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {woods.map((wood, index) => (
                <Draggable key={wood.id} draggableId={wood.id} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="border rounded-md p-4 bg-white shadow flex items-center space-x-4"
                    >
                      <input
                        type="text"
                        placeholder="Type of wood"
                        value={wood.type}
                        onChange={(e) => updateWood(wood.id, 'type', e.target.value)}
                        className="border rounded-md p-2 flex-1"
                      />
                      <input
                        type="number"
                        placeholder="Width"
                        value={wood.dimensions.width}
                        onChange={(e) =>
                          updateWood(wood.id, 'dimensions', { width: e.target.value })
                        }
                        className="border rounded-md p-2 w-20"
                      />
                      <input
                        type="color"
                        value={wood.color}
                        onChange={(e) => updateWood(wood.id, 'color', e.target.value)}
                        className="w-10 h-10 border rounded-md"
                      />
                      <button
                        onClick={() => deleteWood(wood.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button
        onClick={addWood}
        className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-600 mt-4"
      >
        Add Wood
      </button>
    </div>
  );
};

export default DimensionInput;
