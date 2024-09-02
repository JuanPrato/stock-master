import { Ellipsis, PencilIcon, Trash } from "lucide-react";
import { Button } from "../shadcn/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuItem } from "../shadcn/ui/dropdown-menu";

export default function ActionsButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost"><Ellipsis className="size-6" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="p-3 gap-2 cursor-pointer">
          <PencilIcon />EDITAR
        </DropdownMenuItem>
        <DropdownMenuItem className="p-3 gap-2 cursor-pointer">
          <Trash className="text-destructive" />ELIMINAR
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}