import { Search } from "lucide-react";
import { Input } from "../shadcn/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";
import { category } from "@/db/schema";
import { Button } from "../shadcn/ui/button";

interface Props {
  categories: (typeof category.$inferSelect)[];
  defaultValues: {
    query?: string;
    category?: string;
  }
}

export default function Filters({ categories, defaultValues }: Props) {
  return (
    <form className="flex-grow flex justify-center gap-4">
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
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Todas las categorías" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"all"} >Todas las categorías</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id.toString()}>{cat.description}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button>Buscar</Button>
    </form>
  );
}