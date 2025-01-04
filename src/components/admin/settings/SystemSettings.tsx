import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Save, Trash, Plus } from "lucide-react";

interface SystemSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  last_modified_at: string;
}

export function SystemSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newSetting, setNewSetting] = useState({ key: "", value: "" });

  const { data: settings, isLoading } = useQuery({
    queryKey: ["systemSettings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("system_settings")
        .select("*")
        .order("setting_key");

      if (error) throw error;
      return data as SystemSetting[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: string }) => {
      const { error } = await supabase
        .from("system_settings")
        .update({ setting_value: JSON.stringify(value) })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systemSettings"] });
      toast({
        title: "Setting Updated",
        description: "The system setting has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update setting: " + error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("system_settings")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systemSettings"] });
      toast({
        title: "Setting Deleted",
        description: "The system setting has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete setting: " + error.message,
        variant: "destructive",
      });
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("system_settings").insert([
        {
          setting_key: newSetting.key,
          setting_value: JSON.stringify(newSetting.value),
        },
      ]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systemSettings"] });
      setNewSetting({ key: "", value: "" });
      toast({
        title: "Setting Added",
        description: "The new system setting has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add setting: " + error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <div>Loading system settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6" />
          System Settings
        </h2>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Setting Key"
          value={newSetting.key}
          onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
        />
        <Input
          placeholder="Setting Value"
          value={newSetting.value}
          onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
        />
        <Button
          onClick={() => addMutation.mutate()}
          disabled={!newSetting.key || !newSetting.value}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Setting
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Setting Key</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {settings?.map((setting) => (
            <TableRow key={setting.id}>
              <TableCell>{setting.setting_key}</TableCell>
              <TableCell>
                <Input
                  defaultValue={JSON.stringify(setting.setting_value)}
                  onBlur={(e) =>
                    updateMutation.mutate({
                      id: setting.id,
                      value: e.target.value,
                    })
                  }
                />
              </TableCell>
              <TableCell>
                {new Date(setting.last_modified_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteMutation.mutate(setting.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}