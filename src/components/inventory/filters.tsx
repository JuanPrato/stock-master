import { Search } from "lucide-react";
import { Input } from "../shadcn/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";
import { category } from "@/db/schema";

interface Props {
  categories: (typeof category.$inferSelect)[]
}

export default function Filters({ categories }: Props) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar productos..."
          className="pl-10"
        />
      </div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Todas las categorías" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id.toString()}>{cat.description}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}