"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { useAction } from "@/hooks/use-action";
import { ListWithCards } from "@/types";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { toast } from "sonner";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);
  const { execute: executeUpdatedListOrder } = useAction(updateListOrder, {
    onSuccess: (data) => {
      toast.success("List reordered successfully!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeUpdatedCardOrder } = useAction(updateCardOrder, {
    onSuccess: (data) => {
      toast.success("Card reordered successfully!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    // the source is the list or card was dragged or dropped
    // the destination is the list or card get that
    // console.log(result);

    if (!destination) {
      return;
    }

    // if dropped in the same position we don't have to do anything
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // User move a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedData(items);
      // Trigger Server action
      executeUpdatedListOrder({ items, boardId });
    }

    // user move a card
    if (type === "card") {
      let newOrderData = [...orderedData];

      const sourceList = newOrderData.find(
        (list) => list.id === source.droppableId
      );

      // console.log(sourceList);

      const destList = newOrderData.find(
        (list) => list.id === destination.droppableId
      );

      // console.log(destList);

      if (!sourceList || !destList) {
        return;
      }

      // Check if card exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if card exists on the source destination list
      if (!destList.cards) {
        destList.cards = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCard = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCard.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCard;

        setOrderedData(newOrderData);

        // trigger server action
        executeUpdatedCardOrder({
          items: reorderedCard,
          boardId: boardId,
        });

        // User move the card to another list
      } else {
        // remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        // console.log(sourceList.cards.splice(source.index, 1));

        // console.log(movedCard);
        // Assign the new listed to the moved card
        movedCard.listId = destination.droppableId;
        // Add card to the destination list
        destList.cards.splice(destination.index, 0, movedCard);
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        // Update the order for each card in the destination list
        destList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderData);
        // trigger server action
        executeUpdatedCardOrder({
          items: destList.cards,
          boardId: boardId,
        });
      }
    }
  };

  useEffect(
    function dataUpdate() {
      setOrderedData(data);
    },
    [data]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => {
          // console.log(provided);
          return (
            <ol
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-x-3 h-full"
            >
              {orderedData.map((list, index) => {
                return <ListItem key={list.id} index={index} data={list} />;
              })}
              {provided.placeholder}
              <ListForm />
              <div className="flex-shrink-0 w-1" />
            </ol>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};
