import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

import { DndContext, MouseSensor, TouchSensor, useSensor,
  useSensors, DragOverlay, defaultDropAnimationSideEffects, closestCorners } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

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

  const findColumnByCardId = (cardId) => {
    //Nếu có cột mà chứa thẻ có cardId tương ứng, hàm sẽ trả về cột đó.
    return orderedColumns.find( column => column.cards.map(card => card._id)?.includes(cardId) )
  }

  //trigger khi bat dau keo 1 phan tu
  const handleDragStart = (event) => {
    // console.log('dragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  //trigger trong qua trinh keo 1 phan tu.
  const handleDragOver = (event) => {
    //Không làm gì nếu đang kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    //Xử lý khi kéo qua lại giữa các card.
    // console.log('handleDragOver: ', event )
    const { active, over } = event
    if (!active || !over) return

    //activeDraggingCard: la Card dang duoc keo.
    const { id: activeDraggingCardId, data: { current:  activeDraggingCardData } } = active
    //overCard: la Card tuong tac tuong tac khi over boi card duoc keo.
    const { id: overCardId } = over

    //Tim 2 cai column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    //Xu ly Khi keo sang column khac.
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        //Logic tính toán 'cardIndex mới' trên hoặc dưới của overCard lấy chuẩn ra từ thư viện.
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated &&
         active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        //Clone mảng OrderedColumnsState cũ ra một mảng mới để xử lý data rồi return- cập nhật lại OrderedColumnsState mới.
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        if (nextActiveColumn) {
          //Xóa card ở cái column active(xóa card khỏi column cũ khi kéo ra khỏi column đó)
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          //Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        if (nextOverColumn) {
          //check xem card đang kéo có tồn tại ở overColumn hay chưa,nếu có thì cần xóa nó trước.
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          //tiếp theo thêm cái card đang kéo vào overColumn theo vị trí index mới.
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

          //Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        return nextColumns
      })
    }
  }

  //trigger khi ket thuc keo 1 phan tu
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event )

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log('Hanh dong keo tha card,,,,, ')
      return
    }

    const { active, over } = event

    //Trường hợp over tra ve null ,kéo ra chỗ khác linh tinh or click,thì return.
    if (!active || !over ) return

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
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
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
