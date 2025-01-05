import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Favorite {
  id: string;
  name: string;
  type: string;
}

export default function Favorites() {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('favorites')
        .select(`
          id,
          doctor:profiles!favorites_doctor_id_fkey(
            first_name,
            last_name
          )
        `)
        .eq('user_id', user.user.id);

      if (error) throw error;

      const formattedFavorites = data.map(fav => ({
        id: fav.id,
        name: `Dr. ${fav.doctor.first_name} ${fav.doctor.last_name}`,
        type: "Doctor"
      }));

      setFavorites(formattedFavorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch favorites. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (id: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setFavorites(favorites.filter((fav) => fav.id !== id));
      toast({
        title: "Favorite Removed",
        description: "Item has been removed from favorites.",
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove favorite. Please try again later.",
      });
    }
  };

  if (loading) {
    return <div>Loading favorites...</div>;
  }

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