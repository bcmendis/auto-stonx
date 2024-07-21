import React from "react";
import { Badge } from "../ui/badge";
import { Info } from "lucide-react";
import { Separator } from "../ui/separator";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {};

const InfoCard = (props: Props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="w-[200px] rounded-xl border bg-black/5 p-4 backdrop-blur-sm dark:border-muted-foreground/70 data-[state=open]:rounded-b-none">
          <div className="w-full h-full flex gap-4">
            <Info />
            <div className="text-md items-center">Information</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col items-center gap-4 p-4 border border-t-0 rounded-b-xl dark:border-muted-foreground/70 bg-black/5 backdrop-blur-sm">
          <Badge variant="default" className="w-fit">
            Add Node/Edge
          </Badge>
          <p className="text-sm">Drag & Drop</p>
          <Separator />

          <Badge variant="destructive" className="w-fit">
            Delete Node/Edge
          </Badge>
          <p className="text-sm">Click + Delete Key</p>
          <Separator />

          <Badge variant="secondary" className="w-fit">
            Node Indicator
          </Badge>
          <div className="flex flex-col justify-center gap-4">
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <p className="text-sm">Not Connected</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-orange-500" />
              <p className="text-sm">Partially Connected</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <p className="text-sm">Fully Connected</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    // <Card className="bg-black/5 backdrop-blur-sm dark:border-muted-foreground/70">
    //   <CardHeader className="flex flex-row items-center gap-4 p-4">
    //   </CardHeader>
    //   <Separator />
    //   <CardContent className="flex flex-col items-center gap-4 p-4">

    //   </CardContent>
    // </Card>
  );
};

export default InfoCard;
