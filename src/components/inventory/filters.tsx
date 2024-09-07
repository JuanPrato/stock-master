import { CircleDollarSign, Search } from "lucide-react";
import { Input } from "../shadcn/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";
import { category } from "@/db/schema";
import { Button } from "../shadcn/ui/button";
import InputBox from "../layout/input-box";
import { Label } from "../shadcn/ui/label";
import { Separator } from "../shadcn/ui/separator";

interface Props {
  categories: (typeof category.$inferSelect)[];
  defaultValues: {
    query?: string;
    category?: string;
    from?: string;
    to?: string
  }
}

export default function Filters({ categories, defaultValues }: Props) {
  return (
    <form className="flex flex-col justify-center gap-4 p-2">
      <h3 className="text-lg font-medium">Filtros</h3>

      <div className="relative flex-1 flex-grow">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar productos..."
          className="pl-10"
          name="query"
          defaultValue={defaultValues.query}
        />
      </div>
      <Select name="category" defaultValue={defaultValues.category || "all"}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Todas las categorías" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"all"} >Todas las categorías</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id.toString()}>{cat.description}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Separator />
      <div>
        <h3 className="text-base mb-1">Precio:</h3>
        <InputBox>
          <div>
            <Label>Desde:</Label>
            <div className="relative flex-1 flex-grow">
              <CircleDollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="number"
                className="pl-10"
                name="from"
                defaultValue={defaultValues.from}
                placeholder="5000"
              />
            </div>
          </div>
          <div>
            <Label>Hasta:</Label>
            <div className="relative flex-1 flex-grow">
              <CircleDollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="number"
                className="pl-10"
                name="to"
                defaultValue={defaultValues.to}
                placeholder="10000"
              />
            </div>
          </div>
        </InputBox>
      </div>
      <Separator />
      <Button>Buscar</Button>
    </form>
  );
}