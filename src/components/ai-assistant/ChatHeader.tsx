
import { Bot, X } from 'lucide-react';
import { Country } from './types';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ChatHeaderProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedCountry: Country;
  handleCountryChange: (countryId: string) => void;
  countries: Country[];
};

const ChatHeader = ({ 
  isOpen, 
  setIsOpen, 
  selectedCountry, 
  handleCountryChange,
  countries
}: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between bg-movesync-blue text-white p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <Bot size={20} />
        </div>
        <div>
          <p className="font-medium">MoveSync Assistant</p>
          <div className="flex items-center gap-1 text-sm text-white/80">
            <span>Always online</span>
            <span className="mx-1">•</span>
            <span>{selectedCountry.flag} {selectedCountry.name}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Select
          defaultValue={selectedCountry.id}
          onValueChange={handleCountryChange}
        >
          <SelectTrigger className="w-[180px] bg-white/10 border-none text-white hover:bg-white/20">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.id}>
                <span className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button 
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
