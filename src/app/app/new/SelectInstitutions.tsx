'use client';
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Loader2 } from "lucide-react";

import { Institution } from "./actions"

const fetchInstitutions = async () : Promise<Institution[]> => {
  const res = await fetch("/api/institutions");
  const data = await res.json();
  return data;
} 

export default function SelectInstitutionsClient({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  useEffect(() => {
    fetchInstitutions().then(res => {
      res.length && onChange(String(res[0].id))
      setInstitutions(res);
      setLoading(false);
    });
  }, [])

  if (loading) {
      return <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  }

  return (
    <Select
      name="institutionId"
      value={value}
      onValueChange={(val) => onChange(val)}
    >
      <SelectTrigger id="institutionId" className="w-full">
        <SelectValue placeholder="Selecciona una institución" />
      </SelectTrigger>
      <SelectContent>
        {institutions.map((i) => (
          <SelectItem key={i.id} value={String(i.id)}>
            {i.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}