"use client";
import type { Database } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import Image from "next/image";
type Species = Database["public"]["Tables"]["species"]["Row"];

import {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function LearnMore({species}: { species: Species }){
  const [open, setOpen] = useState<boolean>(false);


  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Learn More</Button>
      </DialogTrigger>
     <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {species.scientific_name}:
            <span className= "text-lg font-light italic">
              {species.common_name}
            </span>
          </DialogTitle>
        </DialogHeader>
        {species.image && (
          <div className="relative h-40 w-full">
            <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "contain" }} />
          </div>
        )}
        <p>
          <span className= "text-base font-medium leading-none font-semibol tracking-tight">Total Popultation:</span> {species.total_population ? (
            <span>{species.total_population}</span>) : (<span> N/A</span>)}
        </p>
        <p>
          <span className= "text-base font-medium leading-none font-semibol mt-3">Kingdom:</span> {species.kingdom}
        </p>
        <p>
          <span className= "text-base font-medium leading-none font-semibol mt-3">
            Description:
          </span> {species.description}
        </p>
      </DialogContent>
    </Dialog>
  );
}
