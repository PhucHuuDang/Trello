"use client";

import { cn } from "@/lib/utils";
import { ElementRef, useRef, useState } from "react";
import { ListWithCards } from "@/types";

import { ListHeader } from "./list-header";
import { CardForm } from "./card-form";
import { CardItem } from "./card-item";

interface ListContainerProps {
  data: ListWithCards;
  index: number;
}

export const ListItem = ({ data, index }: ListContainerProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const disabledEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <div className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader onAddCard={enableEditing} data={data} />
        {/* className dynamic */}
        <ol
          className={cn(
            "mx-1 px-1 pt-0.5 flex flex-col gap-y-2",
            data.cards.length > 0 ? "mt-2" : "mt-0"
          )}
        >
          {data.cards.map((card, index) => {
            return <CardItem index={index} key={card.id} data={card} />;
          })}
        </ol>
        <CardForm
          listId={data.id}
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disabledEditing={disabledEditing}
        />
      </div>
    </div>
  );
};