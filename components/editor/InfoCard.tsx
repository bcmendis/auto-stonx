import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Info } from "lucide-react";
import { Separator } from "../ui/separator";

type Props = {};

const InfoCard = (props: Props) => {
  return (
    <Card className="bg-black/5 backdrop-blur-sm dark:border-muted-foreground/70">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <div>
          <Info />
        </div>
        <div>
          <CardTitle className="text-md items-center">Information</CardTitle>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col items-center gap-4 p-4">
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
        <div className="flex flex-col gap-4 justify-center">
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
      </CardContent>
    </Card>
  );
};

export default InfoCard;
