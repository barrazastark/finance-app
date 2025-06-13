// src/app/investments/Loading.tsx (Client o Server Component)
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function InvestmentsLoading() {
  return (
    <div className="space-y-4 max-w-2xl mx-auto p-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-4">
          <CardHeader>
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
