import { SketchPicker } from "react-color";
import React from "react";

interface Props {
  color: string;
  onColorChange: (color: string) => void;
}

const PRESET_COLORS = [
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "#EB144C",
  "#F78DA7",
  "#9900EF",
  "#000000",
  "#FFFFFF",
];

export const ColorPicker = ({ color, onColorChange }: Props) => {
  return (
    <div className="color-picker-wrapper w-full">
      <SketchPicker
        color={color.startsWith("#") ? color : `#${color}`}
        disableAlpha
        onChange={(newColor) => onColorChange(newColor.hex)}
        presetColors={PRESET_COLORS}
        styles={{
          default: {
            picker: {
              boxShadow: "none",
              borderRadius: "12px",
              border: "1px solid #e5e5e5",
              padding: "12px",
            },
          },
        }}
      />
    </div>
  );
};
