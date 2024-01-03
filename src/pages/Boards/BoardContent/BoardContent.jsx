import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

import { DndContext, MouseSensor, TouchSensor, useSensor,
  useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}


function BoardContent({ board }) {
  //activationConstraint yeu cau chuot di chuyen 10px thi moi kich hoat event.
  //Ưu tiên sd mouse & touch để tối ưu trải nghiệm trên mobile và desktop được tốt nhất(thay vì sd PointerSensor mặc định).
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  //ngón tay hoặc bút phải di chuyển hơn 500px trong thời gian delay (250ms) thì thao tác mới bị hủy.
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])

  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id' ) //xay xep columns theo _id;
    setOrderedColumns(orderedColumns)
  }, [board])

  //trigger khi keo 1 phan tu
  const handleDragStart = (event) => {
    // console.log('dragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  //trigger khi ket thuc keo 1 phan tu
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event )
    const { active, over } = event

    //Trường hợp over tra ve null ,kéo ra chỗ khác linh tinh or click,thì return.
    if ( !over ) return

    //Nếu vị trí sau khi kéo khác với vị trí ban đầu.
    if (active.id !== over.id) {
      //Lay vi tri cu tu thang active
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      //Lay vi tri moi tu thang over
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      //Dùng arayMove của dndKit để sx lại mảng column ban đầu
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

      // cập nhật lại state sau khi đã kéo thả
      setOrderedColumns(dndOrderedColumns)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: 0.5
        }
      }
    })
  }

  // console.log('activeDragItemId: ', activeDragItemId)
  // console.log('activeDragItemType: ', activeDragItemType)
  // console.log('activeDragItemData: ', activeDragItemData)
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd} >
      <Box sx={{
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
        p: '10px 0'
      }}>
        <ListColumns columns= { orderedColumns }/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {( !activeDragItemType ) && null}
          {( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN ) && <Column column={activeDragItemData}/>}
          {( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD ) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
