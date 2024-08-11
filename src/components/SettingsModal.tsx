// components/SettingsModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings } from "@/lib/store"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  settings: Settings
  onUpdateSettings: (newSettings: Partial<Settings>) => void
}

export function SettingsModal({ isOpen, onClose, settings, onUpdateSettings }: SettingsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="hard-mode">Hard Mode</Label>
            <Switch
              id="hard-mode"
              checked={settings.hardMode}
              onCheckedChange={(checked) => onUpdateSettings({ hardMode: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => onUpdateSettings({ darkMode: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="color-blind-mode">Color Blind Mode</Label>
            <Switch
              id="color-blind-mode"
              checked={settings.colorBlindMode}
              onCheckedChange={(checked) => onUpdateSettings({ colorBlindMode: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="music-mode">Music</Label>
            <Switch
              id="music-mode"
              checked={settings.musicOn}
              onCheckedChange={(checked) => onUpdateSettings({ musicOn: checked })}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}