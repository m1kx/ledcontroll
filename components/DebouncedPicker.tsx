import { useState } from "react";
import { RgbColor, RgbColorPicker } from "react-colorful";
import { useDebouncyEffect } from "use-debouncy";

export const DebouncedPicker = ({ color, onChange }: { color: RgbColor, onChange: (color: RgbColor) => void }) => {
  const [value, setValue] = useState(color);

  useDebouncyEffect(() => onChange(value), 200, [value]);

  return <RgbColorPicker color={value} onChange={setValue} />;
};
