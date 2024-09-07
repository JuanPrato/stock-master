"use client"

import { CheckCircle, Clock, XCircle, Pen, Check, Save } from "lucide-react";
import { TableCell } from "../shadcn/ui/table";
import { Button } from "../shadcn/ui/button";
import { useRef, useState } from "react";
import InputBox from "../layout/input-box";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";
import { DBOrderState } from "@/lib/db.type";
import { updateOrderState } from "../dashboard/actions";

interface Props {
  orderId: string;
  state: string;
  states: DBOrderState[];
}

export default function StateCell({ orderId, state, states }: Props) {

  const stateId = states.find(s => s.description === state)?.id?.toString();

  const [onEdit, setOnEdit] = useState(false);
  const [newState, setNewState] = useState(stateId?.toString() || "");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVO':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'CANCELADO':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'FINALIZADO':
        return <Clock className="h-5 w-5 text-yellow-500" />
    }
  }

  async function handleUpdate() {
    if (stateId === newState) {
      setOnEdit(false);
      return;
    }

    if (newState === "") {
      return
    }

    const fd = new FormData();
    fd.set("orderId", orderId);
    fd.set("stateId", newState);

    await updateOrderState(fd);

    setOnEdit(false);
  }

  if (onEdit) {
    return (
      <TableCell>
        <InputBox className="w-[225px]">
          <Select name="state" defaultValue={stateId?.toString()} onValueChange={(v) => setNewState(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              {
                states?.map(s => (
                  <SelectItem key={s.id} value={s.id.toString()}>{s.description}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          <Button variant="default" onClick={() => handleUpdate()}><Save /></Button>
        </InputBox>
      </TableCell>
    )
  }

  return (
    <TableCell>
      <InputBox>
        {getStatusIcon(state)}
        <div className="flex items-center">
          <span className="capitalize">{state}</span>
          {
            state === "ACTIVO" && (
              <Button variant="ghost" className="size-8 p-0 rounded-full" onClick={() => setOnEdit(e => !e)}><Pen className="size-4" /></Button>
            )
          }
        </div>
      </InputBox>
    </TableCell>
  );
}