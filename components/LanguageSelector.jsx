"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LanguageSelector = ({ onLanguageChange }) => {
  return (
    <Select onValueChange={onLanguageChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">🇺🇸 English</SelectItem>
        <SelectItem value="id">🇮🇩 Indonesia</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
