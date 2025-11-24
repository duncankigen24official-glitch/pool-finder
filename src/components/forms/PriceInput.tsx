import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrencySymbol } from "@/data/currencies";

interface PriceInputProps {
  value: number;
  onChange: (value: number) => void;
  currency: string;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
}

export const PriceInput = ({ 
  value, 
  onChange, 
  currency, 
  label = "Price",
  placeholder = "0.00",
  min = 0,
  max,
  step = 0.01,
  required = false
}: PriceInputProps) => {
  const symbol = getCurrencySymbol(currency);
  
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor="price-input" className="text-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold text-lg">
          {symbol}
        </span>
        <Input
          id="price-input"
          type="number"
          min={min}
          max={max}
          step={step}
          value={value || ""}
          onChange={(e) => {
            const newValue = parseFloat(e.target.value);
            onChange(isNaN(newValue) ? 0 : newValue);
          }}
          className="pl-12 text-primary font-bold text-lg"
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
};
