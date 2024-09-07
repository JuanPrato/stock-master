import { CircleUserRound } from "lucide-react";
import { Input } from "../shadcn/ui/input";
import { Button } from "../shadcn/ui/button";
import { Label } from "../shadcn/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";
import { DBOrderState } from "@/lib/db.type";
import { OrdersFilter } from "@/lib/api.utils";
import dayjs from "dayjs";
import InputBox from "../layout/input-box";
import { Checkbox } from "../shadcn/ui/checkbox";

interface Props {
  states: DBOrderState[];
  defaultFilters?: OrdersFilter;
}

export default function Filters({ states, defaultFilters }: Props) {
  return (
    <form className="flex flex-col gap-4 p-2">
      <h3 className="text-lg font-medium">Filtros</h3>
      <div className="relative flex-1">
        <CircleUserRound className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input placeholder="Cliente" name="client" className="pl-10" defaultValue={defaultFilters?.client} />
      </div>
      <div className="relative flex-1 flex-grow gap-2 items-center">
        <Label>Desde:</Label>
        <Input type="date" name="from" defaultValue={defaultFilters?.from} />
      </div>
      <div className="relative flex-1 flex-grow gap-2 items-center">
        <Label>Hasta:</Label>
        <Input type="date" name="to" defaultValue={defaultFilters?.to} />
      </div>
      <div>
        <Label>Estado:</Label>
        <Select name="state" defaultValue={defaultFilters?.state?.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Buscar por estado" />
          </SelectTrigger>
          <SelectContent>
            {
              states.map(state => (
                <SelectItem key={state.id} value={state.id.toString()}>{state.description}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </div>
      <InputBox>
        <Label htmlFor="urgent">Solo urgentes?</Label>
        <Checkbox name="urgent" id="urgent" defaultChecked={defaultFilters?.urgent === "on"} />
      </InputBox>
      <Button>Buscar</Button>
    </form>
  );
}