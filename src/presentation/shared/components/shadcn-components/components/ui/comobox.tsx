"use client"
 
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/presentation/shared/components/shadcn-components/lib/utils"
import { Button } from "@/presentation/shared/components/shadcn-components/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/presentation/shared/components/shadcn-components/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/presentation/shared/components/shadcn-components/components/ui/popover"
import { setState } from "@/presentation/shared/types"
 
interface IPropsComponent {
    value : string;
    setValue : setState<string>;
    items : {id:number,name:string}[];
    strSelect : string;
    strNotFound : string;
    width :  string;
}
 
const ComboboxDemo:React.FC<IPropsComponent> = ({items,value,setValue,strSelect,strNotFound,width}) => {
  const [open, setOpen] = React.useState(false)
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between text-sm font-normal text-accent-foreground"
        >
          {value
            ? items.find((item) => String(item.id) === value)?.name
            : strSelect}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="جستجو..." />
          <CommandList>
            <CommandEmpty>{strNotFound}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    setValue(
                        items.findIndex((item)=>item.name==currentValue) !==-1 ? String(items[items.findIndex((item)=>item.name==currentValue)].id) : "" 
                    )
                    setOpen(false)
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === String(item.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
export { ComboboxDemo}
