import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from './stores/actions';
import { Button, FlexContainer, Spacer, Text } from './particles'
import { nanoid } from 'nanoid';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { colors } from './styles';

const party = [
  { id: nanoid(), content: 'Arriette' },
  { id: nanoid(), content: 'Tiamat' },
  { id: nanoid(), content: 'Minotaur' }
];

const planningActivities = {
  [nanoid()]: {
    name: 'Your Party',
    limit: 100,
    items: party
  },
  [nanoid()]: {
    name: 'Scavenge for Supplies',
    varName: 'scavenge',
    limit: 1,
    items: []
  },
  [nanoid()]: {
    name: 'Craft New Gear',
    varName: 'craft',
    limit: 1,
    items: []
  },
  [nanoid()]: {
    name: 'Search for Others',
    varName: 'search',
    limit: 1,
    items: []
  },
  [nanoid()]: {
    name: 'Practice Self-Improvement',
    varName: 'train',
    limit: 1,
    items: []
  },
  [nanoid()]: {
    name: 'Combat 1',
    limit: 1,
    items: []
  },
  [nanoid()]: {
    name: 'Combat 2',
    limit: 1,
    items: []
  },
  [nanoid()]: {
    name: 'Combat 3',
    limit: 1,
    items: []
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

export const Planning = () => {
  const dispatch = useDispatch();

  const [columns, setColumns] = useState(planningActivities);
  const { planningActivityCaps } = useSelector(state => ({
    planningActivityCaps: state.playerReducer.planningActivityCaps
  }), shallowEqual);

  const combatPartySize = Object.values(columns).filter(i => i.name.startsWith('Combat') && !!i.items.length).length;

  return (
    <FlexContainer justifyContent='flex-end' flexWrap='wrap' _css='margin: 0 40px;'>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => (
          <FlexContainer
            key={columnId}
            flexDirection={index ? 'column' : 'row'}
            alignItems='center'
            _css={`
              padding: 8px;
              ${index ? '' : 'width: 100%;'}
              ${column.name === 'Combat 1' ? `
                position: absolute;
                bottom: 90px;
                left: 40px;
              ` : ''}
              ${column.name === 'Combat 2' ? `
                position: absolute;
                bottom: 160px;
                left: 180px;
              ` : ''}
              ${column.name === 'Combat 3' ? `
                position: absolute;
                bottom: 20px;
                left: 180px;
              ` : ''} 
            `}
          >
            <Text _css='width: 150px;' centered>
              {column.name === 'Combat 1' ? 'Combat Party' : !column.name.startsWith('Combat') ? column.name : ''}
            </Text>
            {index ? <br /> : <Spacer width={24} />}
            <Droppable
              key={columnId}
              droppableId={columnId}
              isDropDisabled={column.items.length === (
                column.varName ? planningActivityCaps[column.varName] : column.limit
              )}
            >
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver ? colors.slate : 'rgba(0, 0, 0, 0.9)',
                    border: `3px solid ${colors.yellow}`,
                    borderRadius: '10px',
                    width: index ? 100 : '100%',
                    minHeight: index ? 100 : 100,
                    display: 'flex',
                    flexDirection: index ? 'column' : 'row',
                    gap: '10px',
                    padding: '10px'
                  }}
                >
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            width: '100px',
                            height: '100px',
                            backgroundColor: snapshot.isDragging
                              ? '#263B4A'
                              : '#456C86',
                            color: 'white',
                            ...provided.draggableProps.style
                          }}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </FlexContainer>
        ))}
      </DragDropContext>

      <Button
        isDisabled={combatPartySize !== 3}
        centered
        onClick={() => dispatch(actions.sceneSetScene('map'))}
        _css='position: absolute; left: 350px; bottom: 25px;'
      >
        Proceed ({combatPartySize}/3)
      </Button>
    </FlexContainer>
  );
};
