
import { useColorTheme } from "./ColorThemeProvider";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Paintbrush } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

export const ThemeSelector = () => {
  const { currentTheme, setTheme, themes, addCustomTheme } = useColorTheme();
  const [customColor, setCustomColor] = useState("#000000");
  const [customName, setCustomName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleApplyCustomTheme = () => {
    if (!customName.trim()) {
      toast({
        title: "Theme name required",
        description: "Please provide a name for your custom theme",
        variant: "destructive",
      });
      return;
    }
    
    addCustomTheme({
      name: customName,
      primary: customColor
    });
    
    setIsAdding(false);
    setCustomName("");
    
    toast({
      title: "Theme applied",
      description: `Theme "${customName}" has been applied and saved`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <div className="w-4 h-4 rounded-full" style={{ background: currentTheme.primary }} />
          <span className="hidden sm:inline">{currentTheme.name}</span>
          <Paintbrush className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => setTheme(theme)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ background: theme.primary }} 
            />
            <span>{theme.name}</span>
          </DropdownMenuItem>
        ))}
        
        <hr className="my-2 border-primary-transparent" />
        
        {isAdding ? (
          <div className="p-2 space-y-2">
            <Input
              type="text"
              placeholder="Theme name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="mb-2"
            />
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-12 h-8 p-1"
              />
              <Input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex justify-between mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm" 
                onClick={handleApplyCustomTheme}
              >
                Apply
              </Button>
            </div>
          </div>
        ) : (
          <DropdownMenuItem
            onClick={() => setIsAdding(true)}
            className="cursor-pointer"
          >
            + Add Custom Theme
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
