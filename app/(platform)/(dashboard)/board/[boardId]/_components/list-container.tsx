"use client";

import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(
    function dataUpdate() {
      setOrderedData(data);
    },
    [data]
  );

  // const onDragEnd = (result: any) => {
  //   const { destination, source, draggableId } = result;

  //   if (!destination) {
  //     return;
  //   }

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   const sourceList = orderedData.find(
  //     (list) => list.id === source.droppableId
  //   );
  //   const destinationList = orderedData.find(
  //     (list) => list.id === destination.droppableId
  //   );

  //   if (sourceList && destinationList) {
  //     const sourceCards = Array.from(sourceList.cards);
  //     const destinationCards = Array.from(destinationList.cards);

  //     const [removed] = sourceCards.splice(source.index, 1);
  //     destinationCards.splice(destination.index, 0, removed);

  //     const updatedSourceList = {
  //       ...sourceList,
  //       cards: sourceCards,
  //     };

  //     const updatedDestinationList = {
  //       ...destinationList,
  //       cards: destinationCards,
  //     };

  //     const updatedData = orderedData.map((list) => {
  //       if (list.id === updatedSourceList.id) {
  //         return updatedSourceList;
  //       }

  //       if (list.id === updatedDestinationList.id) {
  //         return updatedDestinationList;
  //       }

  //       return list;
  //     });

  //     setOrderedData(updatedData);
  //   }
  // };

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((list, index) => {
        return <ListItem key={list.id} index={index} data={list} />;
      })}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
