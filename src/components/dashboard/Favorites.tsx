import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Favorite {
  id: string;
  name: string;
  type: string;
}

export default function Favorites() {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Favorite[]>([
    {
      id: "1",
      name: "Dr. John Smith",
      type: "Doctor"
    },
    {
      id: "2",
      name: "Central Hospital",
      type: "Hospital"
    }
  ]);

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
    toast({
      title: "Favorite Removed",
      description: "Item has been removed from favorites.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          Favorites
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div>
                <p className="font-medium">{favorite.name}</p>
                <p className="text-sm text-gray-500">{favorite.type}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveFavorite(favorite.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {favorites.length === 0 && (
            <p className="text-gray-500">No favorites added yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}