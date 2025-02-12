"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { type Species} from "./schema-species-form";
import {useState, useEffect} from "react";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const supabase = createBrowserSupabaseClient();


export default function LearnMore({species}: { species: Species }){
  const [open, setOpen] = useState<boolean>(false);

  const [authorName, setAuthorName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAuthor() {
      if (!species.author) return; // Skip if no author ID

      const { data,  error } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", species.author)
        .single();

      if (error) {
        console.error("Error fetching author:", error);
      } else {
        setAuthorName(data?.display_name || "Unknown Author");
      }
    }

    fetchAuthor().catch(console.error);
  }, [species.author]);// Run when species.author changes


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
              {species.common_name ? (" " + species.common_name) : (" Common Name Not Found")}
            </span>
          </DialogTitle>
        </DialogHeader>
        {species.image && (
          <div className="relative h-40 w-full">
            <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "contain" }} />
          </div>
        )}
        <p>
          <span className= "text-base font-medium leading-none font-semibol tracking-tight">
            Total Popultation:</span> {species.total_population ? (
            species.total_population) : (<span className= "text-base font-light italic"> Total Population Not Found</span>)}
        </p>
        <p>
          <span className= "text-base font-medium leading-none font-semibol mt-3">Kingdom:</span> {species.kingdom}
        </p>
        <p>
          <span className= "text-base font-medium leading-none font-semibol mt-3">
            Description:</span> {species.description ? (
              species.description) : (<span className= "text-base font-light italic"> Description Not Found</span>)}
        </p>
        <p>
          <span className="text-base font-medium leading-none  tracking-tight">
            Author:
          </span>{" "}
          {authorName ? authorName : <span className="text-base font-light italic">Loading...</span>}
        </p>
        <DialogClose asChild>
                  <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary">
                    Close
                  </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
