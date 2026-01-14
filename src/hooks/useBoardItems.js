import { useBoards } from "./useBoards"

export function useBoardItems(){
    const { board, updateBoardField } = useBoards()
    const items = board?.items || []
    
    function setItems(nextItems) {
        updateBoardField('items', nextItems)
    }

    function addItem(item){
        setItems([ ...items, item ])
    }

    function removeItem(itemId) {
        setItems(items.filter(item => item.id !== itemId))
    }

    function updateItem(updatedItem){
        setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item))
    }

    function bringItemToFront(itemId) {          
        const item = items.find(it => it.id === itemId)
        if (!item) return
        return [ ...items.filter(it => it.id !== itemId), item ]  
    }

    function bringItemToBack(itemId) {
        const item = items.find(it => it.id === itemId)
        if (!item) return
        return [item, ...items.filter(it => it.id !== itemId)]
    }

    return{
        items,
        addItem,
        updateItem,
        removeItem,
        bringItemToFront,
        bringItemToBack,
    }
}