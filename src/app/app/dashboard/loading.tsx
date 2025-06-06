import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  // 1 para resumen global + 4 tipos de inversiones
  const skeletonItems = Array(3).fill(null);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-gray-50 rounded-md shadow-md">
      <Card className="p-4">
      <CardHeader>
              <Skeleton className="h-6 w-1/2 rounded mb-4" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-5/6 rounded" />
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-5 w-2/5 rounded" />
            </CardContent>
      </ Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skeletonItems.map((_, i) => (
          <Card key={i} className="p-4">
            <CardHeader>
              <Skeleton className="h-6 w-1/2 rounded mb-4" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-5/6 rounded" />
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-5 w-2/5 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
